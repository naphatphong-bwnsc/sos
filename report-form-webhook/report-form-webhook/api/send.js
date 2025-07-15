
const fetch = require('node-fetch');

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

  const message = {
    text: `📨 แจ้งปัญหาใหม่จาก ${fullname} (${nickname})\nฝ่าย: ${department}\nรุ่น: ${generation}\nรหัสนักเรียน: ${studentId}\nช่องทางติดต่อ: ${contact}\nหัวข้อ: ${topic}\n\nรายละเอียด:\n${problem}`
  };

  try {
    const response = await fetch(process.env.CHAT_WEBHOOK_URL, {
      method: 'POST',
      body: JSON.stringify(message),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      return res.status(200).json({ message: 'ส่งข้อมูลเข้าห้องแชทเรียบร้อยแล้ว ✅' });
    } else {
      return res.status(500).json({ message: 'ส่งไม่สำเร็จ: ' + response.statusText });
    }
  } catch (err) {
    return res.status(500).json({ message: 'เกิดข้อผิดพลาด: ' + err.message });
  }
};
