# ecommerceApp_client

Back-End:
  - NodeJS and ExpressJS

Database:
  - MongoDB

Front-End:
  - React and Redux

## Stages of development

  - Front-End side:
      - Using ReactJS to develop both functional and class-based components;
      - Use of Redux Store, used for state management and data presentation;

### Devops tools:
  - Stripe API, for consuming payment APIs from various third-party services;
  - Create a secure CI pipeline (continuous integration) to Google Cloud Platform using Travis CI;
  - Using the Google Cloud app engine;
  - Use Google Cloud storage to store all static files used in the application;
  - I will create containers using Docker;
  - CI deployment to Docker Ops;
  - Creating different containers for client and server in Docker Hub;

### App features:
  - Possibility to create / authenticate a new user;
  - Possibilities to operate the site in different ways depending on the type of user admin / user;
  - The admin will have at his disposal a dashboard in which he can view the income he has accumulated, 
    the number of active products on the site, the overall rating received from users and the number of 
    products returned by buyers. Also from here you will be able to add new products, you can view the 
    existing ones;
  - Adding / removing products in / from the shopping cart
  - Possibility to purchase products using a shopping card
  - All card payments will go directly to the Stripe account where the admin will be able to view the orders made
