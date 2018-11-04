# pip install python-twitter.

import twitter
api = twitter.Api(consumer_key='56PybIWB9yscZaq84QEirA',
  consumer_secret='HChqBdngd2xp2wrysFnxbmS6xOn2gkqAUAEFiTsY80',
  access_token_key='271722426-edzy3LT079KcBWJOf7iAfUrZeI2PtnruEEmGtVoM',
  access_token_secret='FY6y2P54WsP6wfxiwdyURErIVT4W4DipzVGmrPkASqtMJ')

print(api.VerifyCredentials())

arr = ["football", "cricket"]
bucket = {}

for i in arr:
    search = api.GetSearch(i)
    for tweet in search:
        if bucket[i]:
            bucket[i].add(tweet.user.screen_name)
        else:
            bucket[i] = [tweet.user.screen_name]
    
