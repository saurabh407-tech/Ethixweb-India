import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import { Admin } from '../src/models/Admin.js';
import { Lead } from '../src/models/Lead.js';

const seedDatabase = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ethixweb_india';

  try {
    console.log('[Seed] Connecting to MongoDB...');
    await mongoose.connect(uri);

    const adminEmail = (process.env.ADMIN_EMAIL || 'admin@ethixweb.com').toLowerCase().trim();
    const adminPassword = process.env.ADMIN_PASSWORD || 'AdminPassword@123';
    const adminName = process.env.ADMIN_NAME || 'Ethixweb Administrator';

    let admin = await Admin.findOne({ email: adminEmail }).select('+password');
    if (!admin) {
      admin = new Admin({
        name: adminName,
        email: adminEmail,
        password: adminPassword, // Will be hashed via pre-save bcrypt hook
        role: 'admin',
      });
      await admin.save();
      console.log(`[Seed] Initialized Administrator account:`);
      console.log(`       Email:    ${adminEmail}`);
      console.log(`       Password: ${adminPassword}`);
    } else {
      const isMatch = await admin.comparePassword(adminPassword);
      if (!isMatch) {
        admin.password = adminPassword;
        await admin.save();
        console.log(`[Seed] Updated password for administrator (${adminEmail}) to match environment settings.`);
      } else {
        console.log(`[Seed] Administrator account (${adminEmail}) is already configured with matching password.`);
      }
    }

    // Seed initial leads if the database collection is empty
    const leadCount = await Lead.countDocuments();
    if (leadCount === 0) {
      console.log('[Seed] Seeding verified sample leads...');
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
      console.log(`[Seed] Successfully inserted ${initialLeads.length} sample CRM leads.`);
    } else {
      console.log(`[Seed] Database already contains ${leadCount} lead records.`);
    }

    console.log('[Seed] Database initialization completed successfully.');
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('[Seed Error]', error);
    process.exit(1);
  }
};

seedDatabase();
