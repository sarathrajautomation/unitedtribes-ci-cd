import nodemailer from 'nodemailer';
import fs from 'fs';
import AdmZip from 'adm-zip';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Wait until the report is fully written
async function waitForFile(filePath) {
  let retries = 0;
  while (retries < 120) {
    if (fs.existsSync(filePath)) {
      try {
        const html = fs.readFileSync(filePath, 'utf-8');
        if (html.includes('<html') && html.includes('</html>')) {
          console.log('✅ Report is fully written.');
          return;
        }
      } catch (e) {
        // file exists but may not be fully written yet
      }
    }

    console.log(`⏳ Waiting for full report (retry ${retries})...`);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    retries++;
  }

  throw new Error('❌ Timed out waiting for complete report.');
}

export async function sendReport() {
  const reportPath = path.join(__dirname, 'playwright-report', 'index.html');
  await waitForFile(reportPath);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'pkpraveen082@gmail.com',
      pass: 'frxp bdqo mmaz yjbo', // Gmail App Password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: 'pkpraveen082@gmail.com',
    to: 'sarathrajk@techcedence.com, raneeshap@gmail.com, praveenk@techcedence.com, krishnak@techcedence.com',
    subject: 'United Tribes - 📋 Playwright Automated Daily Test Report',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color: #4CAF50;">✅ United Tribes - Daily Automated Test Report</h2>
        <p>The Playwright automation test has completed. Please find the attached report.</p>
        <ul>
          <li><strong>Status:</strong> Completed</li>
          <li><strong>Execution Time:</strong> ${new Date().toLocaleString()}</li>
        </ul>
        <p>Regards,<br/>United Tribes QA Automation</p>
        <hr/><small>This is an automated email. Do not reply.</small>
      </div>
    `,
    attachments: [
      {
        filename: 'playwright-report.html',
        path: reportPath,
        contentType: 'text/html',
      },
    ],
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent:', info.response);
  } catch (error) {
    console.error('❌ Failed to send email:', error);
  }
}

sendReport();
