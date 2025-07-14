const nodemailer = require('nodemailer');
console.log('MAIL_USER:', process.env.MAIL_USER);
console.log('MAIL_PASS:', process.env.MAIL_PASS ? '✅ SET' : '❌ MISSING');


module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const {
    fullname,
    nickname,
    department,
    generation,
    studentId,
    contact,
    topic,
    problem
  } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  });

  const mailOptions = {
    from: `"แจ้งปัญหา BWN" <${process.env.MAIL_USER}>`,
    to: 'sos@bwnsc.in.th',
    subject: `📨 แจ้งปัญหา: ${topic} โดย ${fullname}`,
    text: `
📌 หัวข้อ: ${topic}

👤 ชื่อ-สกุล: ${fullname}
🏷️ ชื่อเล่น: ${nickname}
📚 ฝ่าย: ${department}
🎓 รุ่น: ${generation}
🆔 รหัสนักเรียน: ${studentId}
📞 ช่องทางติดต่อ: ${contact}

📝 รายละเอียดปัญหา:
${problem}
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: 'ส่งข้อมูลเรียบร้อยแล้ว ✅' });
  } catch (error) {
    return res.status(500).json({ message: 'เกิดข้อผิดพลาด: ' + error.message });
  }
};
