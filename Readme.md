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

+ 매장별 정보 가져오기
    ```
    link = /each-store/:id
    Method = GET

    Params = {
        id: Number = 가져올 매장의 아이디
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
        name: String = 매장 이름
        description: String = 소개글
        maxPersonnel: Number = 최대 수용 가능 인원
        lat: Number<float> = 해당 매장의 위도
        lon: Number<float> = 해당 매장의 경도
        mainCategory: Array = 카테고리
        logo: String = image link
        openTime: String = 오픈 시각
        closeTime: String = 종료 시각
        holiday: String = 휴무일
        infoDescription: String<html> = 매장별 페이에 들어갈 정보글
        conFacility: Array = 편의시설
        seat: Array = 각 자리별 정보(기본값 포함)
        number: Number = 해당 매장의 전화번호
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