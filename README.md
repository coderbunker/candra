# CANDRA: Community Advanced Networked Directory & Resources Administration

## Inspiration

Tech communities characterized by physical space, tooling and memberships such as Hackerspaces, Makerspaces, Fablabs have generally similar requirements for the software to manage their communities. 

With a pool of technically qualified and ambitious members with a "just-do-it" attitude this had led to the creation of tens if not hundreds of different management systems for these communities, with varying degrees of completeness. None of the current solutions on the market have yet have come to dominate and establish themselves as a defacto standard. 

This creates challenges for new communities when trying to select a system, often resulting in a perverse cycle of creating yet another management system that only sort of works for that particular community.

At an high-level, these are the issues preventing widespread adoption of a single system:

* each system is often the result of a part-time or short-term volunteer efforts
* difficult to reach a critical mass of users adoption necessary to sufficient generalize the system
* challenges in creating a critical mass of developers around the open source project
* poor understanding of global requirements (i18n/l10n, payment gateways integration, taxes, etc)
* hard for individual communities to evaluate the software quality attributes of a particular system
* complexity in maintaining the software solutions and the data it generates

This results in numerous problems, among which:

* time spent on management instead of making
* redundant efforts invested in systems
* lack of support and long term maintenance
* lack of a defacto standard API to third party components to (door locks)

Frederic Bazin (founder of agora-space.com) and Ricky Ng-Adam (cofounder of xinchejian.com) with the help of Julien Choulet (a new active member and MeteorJS specialist) face these challenges regularly. Being software developer, we've decided to address these challenges by prototyping a new management system and including them as a basis for future hackathons and as a teaching tool. 

## Goals

### Specific goals

Streamlining the new members onboarding process is an important part as is creating a sense of excitement for new members or between active members is important.

Typical tasks include:

* authentication 
* membership option (duration) selection 
* payment
* profile
* resources search and reservation

### Specific goal of the current demo

Some of the questions members can ask are:

* who are the members of the community?
* who are ACTIVE members of the community?
* who is in the space right now?

In addition, authentication is required to gain privileged access to resources (such as Internet or the space itself) after authentication

We've decided to focus on:

* registering new members
* associating the device they use with members
* tracking presence/absence of members in the space

## Challenges we ran into

* OAuth flow with Github
* Creating a REST Endpoint the router can post IP -> MAC address mapping associated to public IP
 * making sure ARP table is updated for all MAC addresses
 * creating recurring cron job on device
* Submitting and looking up [local IP, MAC address, public IP] on requests
* CANDRA must also deal with the delay in the update of the IP -> MAC association
* single organization can actually have multiple physical spaces
* N members * N devices * N IP addresses * N access points

![Sequence diagram](https://raw.githubusercontent.com/codersfield/candra/master/docs/WhoIsThere.png)

## Accomplishments we're most proud of

* bridging the gap between hardware and modern app development

## What We learned

MeteorJS is awesome out of the box:

* Fast development turn around
* Easier to teach new comers
* Fast, responsive, reactive interfaces that update in real-time
* Easier management of complex dependencies

## What's next for CANDRA

We will continue working on the community management system in future hackathons organized at agora-space.com and as a teaching tool for codersfield.com

## Installation

### Meteor

```
curl https://install.meteor.com/ | sh
git checkout git@github.com:codersfield/candra.git
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