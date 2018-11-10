import twitter
import csv
import collections


api = twitter.Api(consumer_key='56PybIWB9yscZaq84QEirA',
  consumer_secret='HChqBdngd2xp2wrysFnxbmS6xOn2gkqAUAEFiTsY80',
  access_token_key='271722426-edzy3LT079KcBWJOf7iAfUrZeI2PtnruEEmGtVoM',
  access_token_secret='FY6y2P54WsP6wfxiwdyURErIVT4W4DipzVGmrPkASqtMJ')

print(api.VerifyCredentials())

arr = []

with open('inputs.csv', 'rb') as csvfile:
    spamreader = csv.reader(csvfile, delimiter=',')
    for row in spamreader:
        arr = row


bucket = {}

for i in arr:
    search = api.GetSearch(i)
    for tweet in search:
        if bucket.get(i) is not None:
            bucket[i].append(tweet.user.screen_name)
        else:
            bucket[i] = [tweet.user.screen_name]

with open('data.csv', 'wb') as csvfile:
    spamwriter = csv.writer(csvfile, delimiter=',')
    for i in bucket:
        spamwriter.writerow([i]+bucket[i])

print('Done')