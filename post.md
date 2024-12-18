---
layout: null
---

<script>
          window.addEventListener('message', (message) => {
                            console.log(message);

            if (message) {
              const data = JSON.parse(message.data);
              const { userId } = data;
              if (userId){
                localStorage.setItem('userId', userId);
                console.log(userId);
              }
            } else{
                console.log("no message");
            }
          });

          if(localStorage.userId){
document.write(localStorage.getItem("userId"));
          }else{document.write("no data");
          }
      </script>