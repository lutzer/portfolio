# lu-re.de website

html generator for lu-re.de

## Prerequisites

* install node, npm and npx

## Deployment

### Local

* run `npm install`
* run `npm run build` to build site to *dist* folder

### Deployment on server

* login to server and create bare git repo with `git init --bare ~/lu-re.git`
  * copy *.deploy/post-receive* to *~/lu-re.git/hooks/post-receive and change CHECKOUT DIR, GIT_DIR and WWW_DIR accordingly
  * run `chmod +x ~/lu-re.git/hooks/post-receive`
  * run `chmod 755 <WWW_DIR>`
* add remote to local git with `git remote add production user@yourserver.com:lu-re.git`

## Development

* run `npm install`
* run `npm run watch` to start development server




