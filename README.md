# Social-Media-for-Devs

Inside the `/config` folder, create a new file named "default.json".

Inside this file add this tempelate:

```
{
  "mongoURI": "",
  "jsonSecret": "",
  "githubClientId": "",
  "githubClientSecret": ""
}
```

In here, add your mongodb connection uri, any random json secret, your github clientId and secret. Github clinet id and secret can be optional but for proper functioning you will need to add it.

After adding this, open the project in vscode, create a new terminal and run the following commands:

```
"npm i" //Install all the dependencies
"npm run dev" - To start the server and load up frontend simultaneously.
```

This will start the application on desired port. By default server is accessible at port 500 and frontend at 3000.
http://localhost:3000 -> FE
http://localhost:5000 -> BE
