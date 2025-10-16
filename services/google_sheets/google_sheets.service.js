import { google } from 'googleapis';



const auth = new google.auth.GoogleAuth({
  credentials:{
 client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});
const sheets = google.sheets({ version: 'v4', auth });

async function appendColumns(name,email,phoneNumber) {
  try {

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: 'students', 
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [
          [name,email,phoneNumber] // Single row, 3 columns
        ]
      }
    });
    
    console.log('✅ Appended single row:', response.data);
  } catch (error) {
    console.error('❌ Error:', error);
  }
}
export default appendColumns;