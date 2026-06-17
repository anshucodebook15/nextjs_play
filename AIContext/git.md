## initiate Git Repo and push code to git repository

echo "# nextjs_play" >> README.md
git init
git add .
git commit -m "Next JS initiated"
git branch -M main
git remote add origin https://github.com/anshucodebook15/nextjs_play.git
git push -u origin main