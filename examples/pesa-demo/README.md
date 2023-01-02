# PESA DEMO
### Node js app to showcase openpesa-js plugin.

## HOW TO RUN
1. Make sure you are within this demo app directory **yourpath/examples/pesa-demo** and then run the following command to install dependencies:

    ```sh
    npm install

    or 

    yarn (incase you want to use yarn)
    ```
    
2. Make a copy of .env.example to .env by running the below command

      ```sh
      cp .env.example .env
      ```
3. Then update your .env file with your value provided from mpesa api

      ```env
      ENV=sandbox
      PUBLIC_KEY=your_public_key
      API_KEY=your_api_key
      ```

4. Finally run the demo app to get results

      ```sh
      npm start

      or 
      
      yarn start
      ```