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

## TODO

- font suggestions: inter or rubik
- more top padding to headlines
- maybe switch inconsolata with serif for heavy text parts
- put graphic on front page on top
- maybe reduce letter spacing
- about me make sub headlines bold
- Reformat exhibition list, column with years
- meta data for projects: date, tag, role in project, 
- Fix Iphone bugs:
  - font size wrong
  - no smooth scrolling
  - iframe scrolling on front page




