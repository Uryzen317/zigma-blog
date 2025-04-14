# 📝 Zigma Blog (a.k.a. Darmannyar)

> A clean, powerful, and customizable open-source blog platform — built with performance and developer happiness in mind.

<p align="center">
  <img src="https://img.shields.io/badge/Ansible-Automated-blue?logo=ansible&style=flat-square" alt="Ansible">
  <img src="https://img.shields.io/badge/CI%2FCD-Custom%20via%20Ansible-yellow?style=flat-square">
  <img src="https://img.shields.io/badge/Node.js-18.x-brightgreen?logo=node.js&style=flat-square">
  <img src="https://img.shields.io/badge/Version-v1.0.0-blue?style=flat-square">
  <img src="https://img.shields.io/github/last-commit/Uryzen317/zigma-blog?style=flat-square">
</p>

---

📍 **Live site**: [darmannyar.com](https://darmannyar.com)  
📦 **Repository**: [github.com/Uryzen317/zigma-blog](https://github.com/Uryzen317/zigma-blog)

> 📝 The project was originally developed under the name **Zigma Blog**, but launched under the final name [**Darmannyar**](https://darmannyar.com) during the final stages.

---

## 🛠 Tech Stack

Zigma Blog is crafted with love using the following technologies:

| Category        | Stack                                                                 |
|----------------|-----------------------------------------------------------------------|
| 🌐 Frontend     | [Next.js](https://nextjs.org/), [Zustand](https://github.com/pmndrs/zustand), [React](https://reactjs.org/), TypeScript |
| 🎨 Styling      | Tailwind CSS                                                        |
| 🔧 Backend      | [NestJS](https://nestjs.com/), Node.js                               |
| 🗃 Database     | MongoDB, Redis                                                       |
| 🔄 CI/CD        | [Ansible](https://www.ansible.com/)                                  |
| 🛡 Auth          | Custom Cookie-Based auth                                            |

---

## 📁 Repository Structure

This monorepo is split into two main branches:

- **[`client`](https://github.com/Uryzen317/zigma-blog/tree/client)** — Frontend source code (Next.js)
- **[`server`](https://github.com/Uryzen317/zigma-blog/tree/server)** — Backend source code (NestJS)

---

## 🚀 Getting Started

### 🖥️ Client (Frontend)

To run the frontend locally:

```bash
npm run start:dev
```

> ⚠️ **Note for production (CI/CD):**  
> Make sure to **rename `public-env.prod.ts` to `public-env.ts`** during the build pipeline.

---

### 🧠 Server (Backend)

To run the backend locally:

1. **Copy the `.env.example` file** to a new `.env` file:

   ```bash
   cp .env.example .env

   ```

2. **Update the `.env` file** with the appropriate environment variables for your local setup.

3. Then, run the server:

```bash
npm run start:dev
```

> ⚠️ **Note for production (CI/CD):**  
> Ensure that the `.env` file is properly set up on your production environment with the necessary credentials and variables.

---

## 🔧 Deployment Automation with Ansible

This project supports automated deployment using [Ansible](https://www.ansible.com/).  
All related configurations and playbooks are located in the [`ansible` branch](https://github.com/Uryzen317/zigma-blog/tree/ansible).

### 🚀 Quickstart Guide

1. **Switch to the Ansible branch**:
    ```bash
    git checkout ansible
    ```

2. **Configure your inventory**:
    - Copy the example file:
      ```bash
      cp inventory.ini.example inventory.ini
      ```
    - Edit `inventory.ini` with your server's IP/hostname and SSH config.  
      ⚠️ *Do not commit this file – it's already listed in `.gitignore`.*

3. **Update variable files**:
    - Open the files in the `vars/` directory and customize them for your environment (e.g., service names, deployment paths, or other settings).

4. **Run the playbook**:
    ```bash
    ansible-playbook -i inventory.ini playbooks/deploy.yml
    ```

---

This will:
- Build the app on your local machine
- Upload production files to your server
- Install dependencies
- Restart the service

> Everything with one command, under your full control.

---

## 📸 Screenshots

### 🏠 Homepage

![Homepage Screenshot](screenshots/homepage.png)

### 📝 Post View

![Post View Screenshot](screenshots/post-view.png)

### 📝 Login Page

![Login Page Screenshot](screenshots/login-page.png)

---

## 📄 License

This project is licensed under the **Apache License 2.0**.  
See [LICENSE](./LICENSE) for full license text.

---

## 🤝 Contributing

Pull requests are welcome!  
For major changes, please open an issue first to discuss what you'd like to propose.

---

## 🌐 Author

Developed by [Uyzen317](https://uryzen317.ir)

---
