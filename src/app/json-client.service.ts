import { Injectable } from '@angular/core';

// Enumerate target URLS for making REST calls

// const rootURL = 'http://localhost:8181/swar/rest/' // spring service
const rootURL = 'http://localhost:8181/swar_test/rest/'; // Spring test server
// const rootURL = 'http://localhost:3000/api/'; // Node.js Service
// const rootURL = 'http://localhost:8181/swar/rest/';  // Tomcat

  // for internal use - render method
  const getUserTableLocal = function(renderFunction: Function) {
    // return user info to populate user list
    let tableValues;
    const httpClient = new XMLHttpRequest();
    httpClient.open('GET', rootURL + 'users/', true);
    httpClient.setRequestHeader('content-type', 'application/json');
    httpClient.onreadystatechange = function() {
      if (this.readyState !== 4) {
        // insert loading spinner TODO
      } else {
        if (this.status === 404) {
          tableValues = '[{"firstName":"Error","lastName":"Error","ID":"404","userName":"Error"}]';
          console.log(JSON.parse(tableValues));
          renderFunction(JSON.parse(tableValues));
        } else if (this.status === 200) {
          tableValues = httpClient.responseText;
          console.log(JSON.parse(tableValues));
          renderFunction(JSON.parse(tableValues));
        }
      }
    };
    httpClient.send();
  };

@Injectable({
  providedIn: 'root'
})
export class RESTClient {

  constructor() { }

  // GET requests
  getUserInfoTable(renderFunction: Function) {
    // return user info to populate user list
    let tableValues;
    const httpClient = new XMLHttpRequest();
    httpClient.open('GET', rootURL + 'users/', true);
    httpClient.setRequestHeader('content-type', 'application/json');
    httpClient.onreadystatechange = function() {
      if (this.readyState !== 4) {
        // insert loading spinner TODO
      } else {
        if (this.status === 404) {
          tableValues = '[{"firstName":"Error","lastName":"Error","ID":"404","userName":"Error"}]';
          console.log(JSON.parse(tableValues));
          renderFunction(JSON.parse(tableValues));
        } else if (this.status === 200) {
          tableValues = httpClient.responseText;
          console.log(JSON.parse(tableValues));
          renderFunction(JSON.parse(tableValues));
        }
      }
    };
    httpClient.send();
  }

  getUserRole(userID: string, renderFunction: Function) {
    // fetch User Roles
    let itemValue;
    const httpClient = new XMLHttpRequest();
    httpClient.open('GET', rootURL + 'userroles/' + userID, true);
    httpClient.setRequestHeader('content-type', 'application/json');
    httpClient.onreadystatechange = function() {
      if (this.readyState !== 4) {
        // insert loading spinner TODO
      } else {
        if (this.status === 404) {
          itemValue = JSON.parse('[{"id":7473,"orgId": "N/A","orgName":"ARMY","userRoleCode": "N/A", "canWriteCode": "N/A", "canSubmitCode": "N/A"}]');
          renderFunction(itemValue);
        } else if (this.status === 200) {
          itemValue = httpClient.responseText;
          console.log(itemValue);
          renderFunction(JSON.parse(itemValue));
        }
      }
    };
    httpClient.send();
  }

  // POST requests

  createUser(infostring) {
    const httpClient = new XMLHttpRequest();
    httpClient.open('POST', rootURL + 'users/', false);
    httpClient.setRequestHeader('content-type', 'application/json');
    console.log(httpClient);
    httpClient.send(infostring);
  }

  updateRole(infoString, renderFunction: Function) {
    let itemValue;
    const httpClient = new XMLHttpRequest();
    httpClient.open('POST', rootURL + 'userroles/', true);
    httpClient.setRequestHeader('content-type', 'application/json');
    httpClient.onreadystatechange = function() {
      if (this.readyState !== 4) {
        // insert loading spinner TODO
      } else {
        if (this.status === 404) {
          itemValue = JSON.parse('[{"id":7473,"orgId": "N/A","orgName":"ARMY","userRoleCode": "N/A", "canWriteCode": "N/A", "canSubmitCode": "N/A"}]');
          console.log(itemValue);
          renderFunction(itemValue);
        } else if (this.status === 200) {
          itemValue = httpClient.responseText;
          console.log(itemValue);
          renderFunction(JSON.parse(itemValue));
        }
      }
    };
    httpClient.send(infoString);
  }

  updateUser(infostring) {
    const httpClient = new XMLHttpRequest();
    httpClient.open('POST', rootURL + 'users/update', false);
    httpClient.setRequestHeader('content-type', 'application/json');
    httpClient.send(infostring);
  }

  activateUser(userID, renderFunction: Function) {
    const httpClient = new XMLHttpRequest();
    httpClient.open('GET', rootURL + 'users/activate/' + userID, true);
    httpClient.setRequestHeader('content-type', 'application/json');
    httpClient.onreadystatechange = function() {
      if (this.readyState !== 4) {
        // insert loading spinner TODO
      } else {
        getUserTableLocal(renderFunction);
      }
    };
    httpClient.send();
  }


  // DELETE requests

  deactivateUser(userID, renderFunction: Function) {
    const httpClient = new XMLHttpRequest();
    httpClient.open('DELETE', rootURL + 'users/' + userID, true);
    httpClient.setRequestHeader('content-type', 'application/json');
    httpClient.onreadystatechange = function() {
      if (this.readyState !== 4) {
        // insert loading spinner TODO
      } else {
        getUserTableLocal(renderFunction);
      }
    };
    httpClient.send();
  }

  deleteRole(infoString, renderFunction: Function) {
    let itemValue;
    const httpClient = new XMLHttpRequest();
    httpClient.open('DELETE', rootURL + 'userroles/', true);
    httpClient.setRequestHeader('content-type', 'application/json');
    httpClient.onreadystatechange = function() {
      if (this.readyState !== 4) {
        // insert loading spinner TODO
      } else {
        if (this.status === 404) {
          itemValue = JSON.parse('[{"id":7473,"orgId": "N/A","orgName":"ARMY","userRoleCode": "N/A", "canWriteCode": "N/A", "canSubmitCode": "N/A"}]');
          console.log(itemValue);
          renderFunction(itemValue);
        } else if (this.status === 200) {
          itemValue = httpClient.responseText;
          console.log(itemValue);
          renderFunction(JSON.parse(itemValue));
        }
      }
    };
    httpClient.send(infoString);
  }

}
