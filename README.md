# ChomCHOB DevOps Testing

Thank you for interest in ChomCHOB

We have 2 part for testing your DevOps skill, programming and operation part. When you done this test you need to create repository like in "[example submission](example%20submission)" folder on your github repository.

This test contain with __2 part.__

1. [Programming](#programming)
2. [Operation](#operation)

---

# Note
- You have 7 day after receive email to complete this test.

---

# Programming

  ### Simple Wallet API

  **Description**
  
  You need to create simple wallet api for transfer cryptocurrency between user A to user B. Also have admin ability to manage both cryptocurrency and exchange rate with permission that user can't do.

  **Requirement**

  - Admin can increase and decrease user cryptocurrency balance.
  - Admin can see all total balance of all cryptocurrency.
  - Admin can manage exchange rate between cryptocurrency.
  - User can transfer cryptocurrency to other.
  - Security for protect admin privilege.
  > Example
  >
  > UserA transfer 10 ETH to UserB so UserB will recieve 10 ETH
  - User can transfer cryptocurrency to other with difference currency such ETH to BTC with exchange rate.
  > Example
  >
  > UserA transfer 1000 ETH to UserB with exchange rate ETH/BTC equal to 0.05 so UserB will recieve 50 BTC
  - It ok whether cryptocurrency have decimal or not.

  **Technical Detail**
  - This API need to be written with Nodejs.
  - You can use any nodejs web framework but we prefer [express](https://expressjs.com/).
  - You can use any tool or library to help you build API. 
  - Database we prefer mariadb, but if you think other database is suitable it fine to use that db.
  - Please provide us [POSTMAN](https://www.postman.com/) collection and environment(if needed) in JSON format.
  - This is **not** decentralized wallet so no need to worry about blockchain stuff.
  - If some of detail or requirement are ambiguous, we so sorry about that. And feel free to use your creative thinking to do that stuff.
  
# Operation

If you implement the programming part complete, this is your operation part. Here is requirement we want.

  **Requirement**

  - Deploy Simple Wallet API to cloud for calling as a API endpoint. We did not restrict any cloud provider you want to use but we prefer Google Cloud.
  - Use Helm and Kubernetes to help you deploy. You also can use GKE or any managed service.
  - The rest is freedom, you can use any tool or any managed service you want to help you deploy and improve this API to show your DevOps skill.
  - Please provide us a diagram of your design architecture and description, you can use any tool you want to draw your diagram even handwriting is fine.
  
  
## component

- helm
- dockerfile
- docker-compose
- jenkinsfiles
- postman-collection json

**More Detail Git Repository** : [chomchob-devops-testing](https://github.com/toplordsaito/chomchob-devops-testing)