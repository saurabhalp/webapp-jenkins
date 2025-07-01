const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send(`
  
    <!DOCTYPE html>
    <html>
    <head>
      <title>CI/CD Project Dashboard</title>
      <style>
        body {
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          background-color: #f0f2f5;
          margin: 0;
          padding: 0;
          color: #333;
        }
        header {
          background-color: #004080;
          color: white;
          padding: 20px;
          text-align: center;
        }
        main {
          max-width: 1000px;
          margin: auto;
          padding: 20px;
        }
        .section {
          background-color: white;
          margin-bottom: 20px;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        h1, h2 {
          margin-top: 0;
        }
        ul {
          padding-left: 20px;
        }
        footer {
          text-align: center;
          padding: 20px;
          font-size: 0.9em;
          color: #777;
        }
        .tag {
          display: inline-block;
          background-color: #e0f0ff;
          color: #005999;
          border-radius: 5px;
          padding: 4px 10px;
          margin: 4px 6px 0 0;
          font-size: 0.85em;
        }
      </style>
    </head>
    <body>
      <header>
        <h1>CI/CD Pipeline Dashboard</h1>
        <p>Automated Deployment for Node.js Application via Jenkins & AWS</p>
      </header>

      <main>
        <div class="section">
          <h2>Project Objective</h2>
          <p>Automate the end-to-end deployment of a Node.js application using Jenkins pipelines from GitHub to an AWS EC2 instance.</p>
        </div>

        <div class="section">
          <h2>Tech Stack & Tools</h2>
          <div>
            <span class="tag">Node.js</span>
            <span class="tag">Express</span>
            <span class="tag">Jenkins</span>
            <span class="tag">GitHub</span>
            <span class="tag">EC2</span>
            <span class="tag">PM2</span>
            <span class="tag">SSH</span>
          </div>
        </div>

        <div class="section">
          <h2>Steps Performed</h2>
          <ul>
            <li>Set up Jenkins on an AWS EC2 Ubuntu server</li>
            <li>Integrated GitHub repository with Jenkins pipeline</li>
            <li>Configured SSH credentials securely within Jenkins</li>
            <li>Created a multi-stage pipeline: clone, install, deploy</li>
            <li>Used <code>scp</code> for code transfer and <code>pm2</code> for process management</li>
          </ul>
        </div>

        <div class="section">
          <h2>CI/CD Workflow Summary</h2>
          <p>Whenever a new code push is made to the <strong>main</strong> branch on GitHub, Jenkins automatically triggers a pipeline that:</p>
          <ul>
            <li>Clones the latest code</li>
            <li>Installs dependencies</li>
            <li>Deploys to the target EC2 instance</li>
            <li>Restarts the Node.js process using PM2</li>
          </ul>
        </div>

        <div class="section">
          <h2>Functional Outcomes</h2>
          <ul>
            <li>Fully automated deployment pipeline</li>
            <li>Zero-downtime application updates with PM2</li>
            <li>Modular, secure, and maintainable CI/CD structure</li>
          </ul>
        </div>

        <div class="section">
          <h2>Non-Functional Benefits</h2>
          <ul>
            <li>Reduced manual effort and human error</li>
            <li>Scalable pipeline design for future integrations (e.g., testing, rollback)</li>
            <li>Credential security using Jenkins secret management</li>
          </ul>
        </div>

        <div class="section">
          <h2>Next Enhancements (Planned)</h2>
          <ul>
            <li>Integrate automated testing stage (Jest/Mocha)</li>
            <li>Notify via Slack on successful/failed deployments</li>
            <li>Enable version tagging and rollback support</li>
          </ul>
        </div>
      </main>

      <footer>
        &copy; 2025 | Node.js CI/CD Project | Saurabh Kumar
      </footer>
    </body>
    </html>
  `);
});

app.listen(port, () => console.log(`App running on port ${port}`));
