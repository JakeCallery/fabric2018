##Raspberry Pi
* apt-get install git
* node install: 
  * curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
  * sudo apt-get install -y nodejs
* Install webpack globally
  * npm install -g webpack
* Generate BitBucket Key:
  * ssh-keygen
* copy public key to bit bucket:
  * cat ~/.ssh/id_rsa.pub
* add key at bitbucket.org:
  * Profile -> Settings -> SSH Keys -> Add Key -> Paste In Key
* Clone repo
  * git clone git@bitbucket.org:JakeCallery/fabric2018.git
