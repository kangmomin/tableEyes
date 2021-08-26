# TableEyes API
+ 매장 정보 가져오기
    ```
    link = /store/:type/:id
    Method = GET

    Params = {
        type: String {
            id, ownerId, name, star, starCount,
            lat, lon, maxPersonnel, nowPersonnel,
            isOpen, description, category, logo,
            waitingState
        }

        id: Number
    }
    ```

+ 가입
    ```
    link = /sign-up
    Method = POST
    
    type: post
    Data = {
        name: String
        password: String
        email: String
        age: Number<>
        sex: String = male || female
        phoneNumber: Number<>
        hometown: String
    }
    ```

+ 로그인
    ```
    link = /login
    Method = POST
    
    Data = {
        id: String = name
        password: String
    }
    ```

+ 매장 추가
    ```
    link = /store
    Method = POST

    Data = {
        name: String
        desription: String
        maxPersonnel: Number<>
        lat: Number<float>
        lon: Number<float>
        category: String[]
        logo: String = image link
    }
    ```

+ 매장 정보 수정
    ```
    link = /store
    Method = PUT

    Data = {
        name: String
        desription: String
        lat: Number<float>
        lon: Number<float>
        category: String[]
        logo: String = image link
    }
    ```

+ 매장 인원수 수정
    ```
    link = /store/personnel/:id/:count
    Method = PATCH

    Params = {
        id: Number = store id
        count: Number
    }
    ```

+ 매장 삭제
    ```
    link = /store/:id
    Method = DELETE
    
    Params = {
        id: Number = store id
    }
    ```