/* global browser element by expect*/
describe("Check if data is loaded: ",function () {
    
    it("List shows more than 3 items", function (){
        
        browser.get("http://localhost:8080");
        var contacts = element
            .all(by.repeater("contact in contacts"))
            .then(function (initialContacts)){
                
                element(by.model(’newContact.name’)).sendKeys(’pepe’);
                element(by.model(‘newContact.phone’)).sendKeys(‘’);
                
                element.by();
                
                element
                    .all(by.repeater());

))
            };
        expect(contacts.count()).toBeGreaterThan(0);
    });
});