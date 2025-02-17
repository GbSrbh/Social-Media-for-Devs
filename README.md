# Social-Media-for-Devs

Inside the `/config` folder, create a new file named "default.json".

Inside this file add this tempelate:
{
  "mongoURI": "",
  "jsonSecret": "",
  "githubClientId": "",
  "githubClientSecret": ""
}

In here, add your mongodb connection uri, any random json secret, your github clientId and secret. Github clinet id and secret can be optional but for proper functioning you will need to add it.

After adding this, open the project in vscode, create a new terminal and run the following commands:
"npm i" //Install all the dependencies
"npm run dev"

This will simultaneously launch backend and frontend (client).
