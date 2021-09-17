# TableEyes API
+ 매장 정보 가져오기
    ```
    link = /store/type/:type?/id/:id?/category/:category?
    Method = GET

    Params = {
        type: String {
            id, ownerId, name, description, category, detail, nowPersonnel, isOpen
        }

        id: Number

        category: String
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
        age: Number
        sex: String = male || female
        phoneNumber: Number
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
        description: String
        maxPersonnel: Number
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
        description: String
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

+ 리뷰 등록
    ```
    link = /review/:id
    Method = POST

    Params = {
        id: Number = store id
    }

    Data = {
        description: String
        starCoutn: Number = 별점
    }
    ```

+ 리뷰 가져오기
    ```
    link = /review/:storeId
    Method = GET

    Params = {
        storeId: Number = 매장 아이디
    }
    ```

+ 정렬
    ```
    link = /sort/:mode
    Method = POST

    Params = {
        mode: String = personnel, location, star, name
    }

    Data = {
        data: JSON = requestStore 값 + location(매장과 유저간의 거리)
    }
    
    message: "Method Not Allowed",
    detail: {
        Methods: ["name", "star", "location", "personnel"]
    }
    ```

+ 이미지 업로드
    ```
    link = /image-upload
    Method = POST

    Data = {
        img: "file"
    }

    이미지는 png, jpg, gif, jpeg확장자만 인정합니다.
    ```