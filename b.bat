@echo off
setlocal

rem Define source and destination directories
set "SOURCE_DIR=E:\dev-bkp\github\_react\app-remote-theme-dev"
set "BUILD_DIR=E:\dev-bkp\github\_react\app-home-remote-prod"

echo Processing final build...

rem Use robocopy to copy the source directory to the build directory, excluding specified directories
robocopy "%SOURCE_DIR%" "%BUILD_DIR%" /E /XD "_site" ".jekyll-cache" "tools" "browser" "community" "node_modules" "user" "b" "backup"

rem Check if robocopy was successful
if %errorlevel% geq 8 (
    echo Error during final build. Error Code: %errorlevel%
    exit /b %errorlevel%
)

echo Build completed successfully!

rem Run the npm javascript-obfuscator command
echo Obfuscating JavaScript files...
REM javascript-obfuscator "%BUILD_DIR%\assets\js" --output "%BUILD_DIR%\assets\js" --compact true --control-flow-flattening true --self-defending true --dead-code-injection true

javascript-obfuscator "%BUILD_DIR%\assets\js" --output "%BUILD_DIR%\assets\js" --compact true --control-flow-flattening true --dead-code-injection true --string-array true --string-array-threshold 0.75 --string-array-encoding rc4 --disable-console-output true


rem Check if the obfuscation was successful
if %errorlevel% neq 0 (
    echo Error during obfuscation. Error Code: %errorlevel%
    exit /b %errorlevel%
)

echo Obfuscation completed successfully!

endlocal
