@echo off
echo Starting CareerCompass servers...
echo.
echo Make sure you have updated the .env file with your Gemini API key!
echo.

start cmd /k "cd server && npm start"
timeout /t 5
start cmd /k "cd server && npm run proxy"

echo.
echo Servers started! The assessment page will open automatically in your browser.
echo.
echo If it doesn't open automatically, please go to: http://localhost:5500
echo.

:: Try to open the browser automatically
start http://localhost:5500 