export default class APIService{
        // Insert an article
        static InsertArticle(body){
            return fetch(`http://localhost:5000/dashboard`,{
                'method':'GET',
                 headers : {
                'Content-Type':'application/json'
          },
          body:JSON.stringify(body)
        })
        .then(response => response.json())
        .catch(error => console.log(error))
        }
    
    }