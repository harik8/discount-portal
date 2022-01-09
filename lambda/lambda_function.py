import boto3
import json
import logging
import os

logger = logging.getLogger()
logger.setLevel(logging.INFO)

def lambda_handler(event, context):
    logger.info("Event data - {}".format(event))
    
    ses = boto3.client('ses')
    
    description = event['discount_message']
    discount_percentage = event['discount_percentage']
    discount_code = event['code']
    expired_on = event['expired_date']
    subscribers_list = event['subscribers_list']
    subscribers = []
    
    for subscriber in subscribers_list.split(','):
        subscribers.append(subscriber)
    
    logger.info("Subscribers {}".format(subscribers))
    
    response = ses.send_templated_email(
    Source=os.environ['SOURCE_ADDRESS'],
      Destination={
          'ToAddresses': subscribers,
        },
        Template="DISCOUNT_DISPATCHER",
        TemplateData="{ \"description\":\""+description+"\", \"code\":\""+discount_code+"\", \"percentage\":\""+discount_percentage+"\", \"expired\":\""+expired_on+"\"}"
      )
    logger.info("SES response {}".format(response))
    return {
        'statusCode': response['ResponseMetadata']['HTTPStatusCode']
    }