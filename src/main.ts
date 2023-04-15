function doPush(e) {
    let slackChannels = getSlackChannels();
    let slackChannelInfoList = convertSlackChannelsToMap(slackChannels);

    let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Slackチャンネル一覧");
    sheet.clear();
    sheet.getRange(1, 1, 1, 10).setValues([Object.keys(slackChannelInfoList[0])]);
    slackChannelInfoList = slackChannelInfoList.map((channel) => {
        return Object.values(channel);
    });
    sheet.getRange(2, 1, slackChannelInfoList.length, 10).setValues(slackChannelInfoList);
}

function getSlackChannels() {
    let channels = [];
    let next_cursor = "";

    let properties = PropertiesService.getScriptProperties();
    let SLACK_TOKEN = properties.getProperty("SLACK_TOKEN");
    while(true) {
        let url = "https://slack.com/api/conversations.list?exclude_archived=false&limit=1000&types=public_channel";
        if (next_cursor !== "") {
            url += `&cursor=${next_cursor}`;
        }
        let params: any = {
            contentType: "application/json",
            method: "get",
            headers: {
              "Authorization": `Bearer ${SLACK_TOKEN}`
            }
        };
        let response = JSON.parse(UrlFetchApp.fetch(url, params).getContentText());

        channels = channels.concat(response.channels);
        next_cursor = response.response_metadata.next_cursor;

        if (next_cursor === "") {
            break;
        }
    }
    return channels;
}

type SlackChannelInfo = {
    id: string;
    name: string;
    name_normalized: string;
    created: number;
    creator: string;
    is_archived: boolean;
    purpose: string;    // purpose.value
    topic: string;    // topic.value
    previous_names: string;
    num_members: number;
};

function convertSlackChannelsToMap(channels) {
    let slackChannelInfoList = channels.map((channel) => {
        return {
            id: channel.id,
            name: channel.name,
            name_normalized: channel.name_normalized,
            created: channel.created,
            creator: channel.creator,
            is_archived: channel.is_archived,
            purpose: channel.purpose.value,
            topic: channel.topic.value,
            previous_names: channel.previous_names.join(","),
            num_members: channel.num_members
        };
    });
    return slackChannelInfoList;
}
