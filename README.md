# CANDRA: Community Advanced Networked Directory & Resources Administration

This project was created as part of the Global Meteor 2015 competition (Oct 10th to Oct 12th 2015).


[Our submission to the competition](docs/METEOR-2015.md)

## Goals

Streamlining the new members onboarding process is an important part as is creating a sense of excitement for new members or between active members is important.

Typical tasks include:

* authentication 
* membership option (duration) selection 
* payment
* profile
* resources search and reservation

## Installation

### Meteor

```
curl https://install.meteor.com/ | sh
git clone git@github.com:codersfield/candra.git
cd candra
meteor
```

### Uploading ARP (on a tomato router when it is not the DHCP server)

Find where the Candra server is:

ssh root@<router ip>

edit /tmp/home/root/uploadarp.sh

```
#!/bin/ash
CANDRA_SERVER_URL=http://192.169.15.76:3099
CANDRA_SERVER_BEARER_TOKEN=abcd
SUBNET=192.169.15

for lastoctet in $(seq 254)
do 
  ping -W 1 -c 1 $SUBNET.$lastoctet
done 
curl --data-urlencode arpTable@/proc/net/arp $CANDRA_SERVER_URL/router/arp/candra -H "Authorization: Bearer $CANDRA_SERVER_BEARER_TOKEN"
```

Create a cronjob:

```
cru a UploadARP "*/5 * * * * /tmp/home/root/uploadarp.sh"
```

## References

* http://www.polarcloud.com/tomatofaq