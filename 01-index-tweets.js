const tweets = require('./tweets.json');
const es = require('elasticsearch');
const Promise = require('bluebird');

const client = new es.Client();

createIndex()
    .then(indexTweets);

function createIndex() {
    return client.indices.create({
        index: 'data-skup-tweets',
        body: {
            mappings: {
                tweet: {
                    dynamic_templates: [
                        {
                            notanalyzed: {
                                match: '*',
                                match_mapping_type: 'string',
                                mapping: {
                                    type: 'string',
                                    index: 'not_analyzed'
                                }
                            }
                        }
                    ],

                    properties: {
                        text: { type: 'string', index: 'analyzed' }
                    }
                }
            }
        }
    })
}

function indexTweets() {
    return Promise.map(tweets, tweet => {
        process.stdout.write('.');

        return client.index({
            index: 'data-skup-tweets',
            type: 'tweet',
            body: tweet
        })
    }, { concurrency: 3 })
    .catch(err => console.log(err));
}

