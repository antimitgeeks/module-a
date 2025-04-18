export default class APIServices {
    //Get Partner Info
    async getPartnerInfoData() {
        const response = await fetch(`/api/partner/info?shop=quickstart-1add1160.myshopify.com`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const result = await response.json();
        return result;
    }

    //Create Partner
    async createPartnerInfoData() {
        const response = await fetch(`/api/partner/create?shop=quickstart-1add1160.myshopify.com`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const result = await response.json();
        return result;
    }

    //Partner language update
    async languageUpdate(data) {
        const response = await fetch(`/api/partner/update?shop=quickstart-1add1160.myshopify.com`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const result = await response.json();
        return result;        
    }

    //Get language list
    async languageList(reqBody) {
        const response = await fetch(`/api/language/list?shop=quickstart-1add1160.myshopify.com`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reqBody),
        });
        console.log(response)
        const result = await response.json();
        return result;  
    }

    //Cancel active plan
    async getExtensions() {
        const response = await fetch(`/api/partner/page-previewing`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const result = await response.json();
        return result;
    }
    async getSettings() {
        const response = await fetch(`/api/partner/settings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const result = await response.json();
        return result;
    }

}
