# cPanel CI/CD Deployment Guide

This project is configured with a GitHub Actions workflow to automatically build, lint, and deploy the Next.js static site to your cPanel hosting environment on every push to the `main` branch.

## How it Works

1. **Trigger**: Pushing to the `main` branch triggers the GitHub Action `.github/workflows/deploy.yml`.
2. **Build**: GitHub runs `npm ci` (installs dependencies), `npm run lint` (checks code quality), and `npm run build` (builds and exports Next.js pages to the `/out` directory).
3. **Apache Config**: The `.htaccess` file inside `public/` is copied to `/out/.htaccess`.
4. **Deploy**: The contents of the `/out` folder are uploaded to your cPanel directory via FTP.

---

## Configuration & GitHub Secrets

The pipeline uses GitHub Secrets for secure FTP authentication. The following repository secrets must be configured in your GitHub repository (**Settings** > **Secrets and variables** > **Actions**):

| Secret Name | Description | Example |
| :--- | :--- | :--- |
| `FTP_SERVER` | Your host FTP address or IP address | `ftp.yourdomain.com` or `192.168.1.1` |
| `FTP_USERNAME` | Your FTP account username | `deploy@yourdomain.com` or `cpanelusername` |
| `FTP_PASSWORD` | The password for the FTP account | `********` |
| `FTP_TARGET_DIR` | (Optional) The folder on the server where files should go relative to the FTP login directory (defaults to `public_html/`). | `public_html/` or `public_html/conference/` |

> [!NOTE]
> **Dynamic Path Stripping**: If you configure the secret with an absolute server path (e.g., `/home/usarhosting/public_html/conference`), the CI/CD pipeline is designed to automatically detect and strip the absolute `/home/username/` prefix, converting it into a clean relative path (`public_html/conference/`) required by the FTP deployment runner.


---

## Setting Up an FTP Account in cPanel (Best Practice)

Rather than using your master cPanel credentials, it is highly recommended to create a dedicated, restricted FTP account for security:

1. Log into your **cPanel** account.
2. Search for and open **FTP Accounts** under the *Files* section.
3. Add a new FTP Account:
   - **Log in**: Choose a username (e.g., `github-deploy`).
   - **Domain**: Choose the corresponding domain.
   - **Directory**: **Crucial step!** Point this to the root of your website, e.g., `public_html`. If you want to deploy to a subdirectory, set it to `public_html/your-subdirectory`.
4. Click **Create FTP Account**.
5. Note down the FTP username (it usually looks like `username@yourdomain.com`) and the password you set. Use these for your GitHub Secrets.

---

## Clean URLs & Routing (.htaccess)

Since this is a static Next.js export, pages are built as `.html` files (e.g., `/call-for-papers.html`). To prevent search-engine unfriendly URLs (like `domain.com/call-for-papers.html`), we have added a custom [`.htaccess`](file:///Users/sheelendra/Documents/zed/acm-conf/public/.htaccess) configuration file under the `public/` folder.

This configuration:
- Automatically redirects all HTTP requests to HTTPS.
- Internally rewrites clean URLs (e.g., `/call-for-papers`) to serve `/call-for-papers.html` seamlessly without showing the extension.
- Configures `/404.html` as the default fallback error page.

---

## Troubleshooting

### 1. The Deployment Fails at the "Deploy to cPanel via FTP" step
- **Incorrect FTP Server**: Double check your `FTP_SERVER` address. Some hosting providers require `ftp.yourdomain.com`, while others require the direct IP address or the server hostname (e.g., `node123.hostingprovider.com`).
- **Connection Timeout/Firewall**: Some shared hostings block GitHub Actions runner IPs by default. Ensure your hosting provider allows FTP connections from external IP ranges, or try using port `21` explicitly.
- **Incorrect Directory Structure**: If your cPanel FTP account was created with a path restriction (e.g., restricted to `/public_html`), then the FTP client is already at that folder upon login. In that case, setting `FTP_TARGET_DIR` to `/public_html/` will result in trying to upload to `/public_html/public_html/`. If your FTP account is already restricted to `/public_html`, set `FTP_TARGET_DIR` to `/` (or leave it empty/remove it so it falls back appropriately, or adjust the cPanel FTP directory settings).

### 2. Website returns 404 on Sub-pages
- If subpages like `/venue` or `/registration` return a 404 error when refreshed or visited directly, ensure that the `.htaccess` file was successfully uploaded to your `public_html/` directory. (Note: On macOS and Linux, files beginning with a dot like `.htaccess` are hidden by default).

### 3. File upload is taking too long
- Since FTP uploads files one-by-one, it might take a few minutes if there are many static assets. The GitHub action uses differential uploading (it only uploads modified files), so subsequent deployments will be much faster.
