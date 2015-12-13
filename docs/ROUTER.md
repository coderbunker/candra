## Router configuration

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