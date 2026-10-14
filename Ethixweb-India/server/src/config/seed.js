import { Admin } from '../models/Admin.js';
import { Lead } from '../models/Lead.js';

/**
 * Automatically provisions or synchronizes admin credentials on server startup.
 * Supports credentials configured in Render / cloud provider environment variables.
 */
export const autoSeedAdmin = async () => {
  try {
    // 1. Seed or synchronize custom Admin configured via Environment Variables
    const envAdminEmail = (process.env.ADMIN_EMAIL || process.env.EMAIL || '').toLowerCase().trim();
    const envAdminPassword = (process.env.ADMIN_PASSWORD || process.env.PASSWORD || '').trim();
    const envAdminName = process.env.ADMIN_NAME || 'Ethixweb Administrator';

    if (envAdminEmail && envAdminPassword) {
      let customAdmin = await Admin.findOne({ email: envAdminEmail }).select('+password');
      if (!customAdmin) {
        customAdmin = new Admin({
          name: envAdminName,
          email: envAdminEmail,
          password: envAdminPassword, // Will be hashed via pre-save bcrypt hook
          role: 'admin',
        });
        await customAdmin.save();
        console.log(`[Seed] Successfully provisioned Admin account for ${envAdminEmail} from environment variables.`);
      } else {
        const isMatch = await customAdmin.comparePassword(envAdminPassword);
        if (!isMatch) {
          customAdmin.password = envAdminPassword;
          await customAdmin.save();
          console.log(`[Seed] Updated password for Admin account (${envAdminEmail}) from environment variables.`);
        }
      }
    }

    // 2. Ensure default demo admin account exists as reliable fallback
    const defaultEmail = 'admin@ethixweb.com';
    const defaultPassword = 'AdminPassword@123';
    let defaultAdmin = await Admin.findOne({ email: defaultEmail }).select('+password');
    if (!defaultAdmin) {
      defaultAdmin = new Admin({
        name: 'Ethixweb Administrator',
        email: defaultEmail,
        password: defaultPassword,
        role: 'admin',
      });
      await defaultAdmin.save();
      console.log(`[Seed] Initialized default demo admin (${defaultEmail}).`);
    }

    // 3. Seed initial leads if collection is empty
    const leadCount = await Lead.countDocuments();
    if (leadCount === 0) {
      const initialLeads = [
        {
          name: 'Aarav Sharma',
          email: 'aarav.sharma@sharmatech.in',
          phone: '+91 98765 43210',
          company: 'Sharma Tech Logistics',
          service: 'Web Applications & Dashboards',
          message: 'Need a customized logistics and fleet dispatch portal for our north Indian routes with role-based access.',
          status: 'new',
          notes: 'Target delivery timeline is 6 weeks. Scoping document requested.',
        },
        {
          name: 'Priya Sundaram',
          email: 'priya@healthplus.org.in',
          phone: '+91 98111 22334',
          company: 'HealthPlus Clinics',
          service: 'AI Automation & Intelligent Workflows',
          message: 'Looking to implement automated appointment scheduling and patient reminders over WhatsApp.',
          status: 'contacted',
          notes: 'Discovery call held. Demonstrated webhook integration architecture.',
        },
        {
          name: 'Rohan Mehra',
          email: 'rohan@finwave.in',
          phone: '+91 99887 76655',
          company: 'FinWave Capital',
          service: 'Websites & Digital Portals',
          message: 'Complete redesign and development of our corporate portal with sub-second mobile page loads and investor documentation.',
          status: 'qualified',
          notes: 'Scope agreed. Waiting for contract signature.',
        },
        {
          name: 'Ananya Deshmukh',
          email: 'ananya@bharattextiles.co',
          phone: '+91 97654 32190',
          company: 'Bharat Textiles Ltd',
          service: 'CRM & Systems Integration',
          message: 'Integration between website inquiry forms and our internal Zoho CRM pipeline with automated GST invoice generation.',
          status: 'converted',
          notes: 'Contract signed. Milestone 1 sprint initiated.',
        },
      ];
      await Lead.insertMany(initialLeads);
      console.log(`[Seed] Seeded ${initialLeads.length} sample CRM leads.`);
    }
  } catch (error) {
    console.warn('[Seed Warning] Auto-seed non-fatal error:', error.message);
  }
};
