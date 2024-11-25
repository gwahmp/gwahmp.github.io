@echo off
setlocal enabledelayedexpansion

rem Define source and destination directories
set "SOURCE_DIR=E:\dev-bkp\github\_react\app-remote-theme-dev"
set "DEST_DIR=D:\backup\app-remote-theme-dev"

rem Define folders to exclude (space-separated, without quotes)
set "EXCLUDE_DIRS=node_modules _site .jekyll-cache .git"

rem Initialize the exclude options for robocopy
set "EXCLUDE_OPTIONS="

for %%D in (%EXCLUDE_DIRS%) do (
    set "EXCLUDE_OPTIONS=!EXCLUDE_OPTIONS! /XD \"%%D\""
)

rem Run robocopy to back up, excluding specific folders
robocopy "%SOURCE_DIR%" "%DEST_DIR%" /MIR !EXCLUDE_OPTIONS!

echo Backup completed successfully!
pause
endlocal
