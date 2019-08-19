import { Injectable } from '@angular/core';
import { HttpClient } from 'selenium-webdriver/http';

// Enumerate target URLS for making REST calls

// const rootURL = 'http://localhost:8181/swar/rest/' // spring service
const rootURL = 'http://localhost:8181/swar_test/rest/'; // Spring test server
// const rootURL = 'http://localhost:3000/api/'; // Node.js Service
// const rootURL = 'http://localhost:8181/swar/rest/';  // Tomcat


// Internal method variables ------------------------------------- //
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

  const getDataCallTableLocal = function(renderFunction: Function) {
    // return user info to populate user list
    let tableValues;
    const httpClient = new XMLHttpRequest();
    httpClient.open('GET', rootURL + 'dc/', true);
    httpClient.setRequestHeader('content-type', 'application/json');
    httpClient.onreadystatechange = function() {
      if (this.readyState !== 4) {
        // insert loading spinner TODO
      } else {
        if (this.status === 404) {
          tableValues = '[{"dcId":"Error","serviceId":"Error","ID":"404","title":"Error"}]';
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


  const returnDTList = function(instId, dcId, renderFunction) {
    // populate the disposal transaction list
    let itemValue;
    const httpClient = new XMLHttpRequest();
    httpClient.open('GET', rootURL + 'disposal/getAllDisposalByDcIdAndInstId?instId=' + instId + '&dcId=' + dcId, true);
    httpClient.setRequestHeader('content-type', 'application/json');
    httpClient.onreadystatechange = function() {
      if (this.readyState !== 4) {
        // insert loading spinner TODO
      } else {
        if (this.status === 404) {
          console.log('404 error, get DTlist');
        } else if (this.status === 200) {
          itemValue = httpClient.responseText;
          renderFunction(itemValue);
        }
      }
    };
    httpClient.send();
  };

  const returnRTList = function(instId, dcId, renderFunction) {
    // populate the recycling transaction list
    let itemValue;
    const httpClient = new XMLHttpRequest();
    httpClient.open('GET', rootURL + 'recycle/getAllRecycleByDcIdAndInstId?instId=' + instId + '&dcId=' + dcId, true);
    httpClient.setRequestHeader('content-type', 'application/json');
    httpClient.onreadystatechange = function() {
      if (this.readyState !== 4) {
        // insert loading spinner TODO
      } else {
        if (this.status === 404) {
          console.log('404 error, get DTlist');
        } else if (this.status === 200) {
          itemValue = httpClient.responseText;
          renderFunction(itemValue);
        }
      }
    };
    httpClient.send();
  };

// exported methods ------------------------------------------------ //

@Injectable({
  providedIn: 'root'
})
export class RESTClient {

  constructor() { }

// Installation Module Methods ------------------------------------- //

  // get past details
  getDefaultSession() {
    const httpClient = new XMLHttpRequest();
    httpClient.open('GET', rootURL + 'userini/', false);
    httpClient.setRequestHeader('content-type', 'application/json');
    httpClient.onreadystatechange = function() {
      if (this.readyState !== 4) {
        // insert loading spinner TODO
      } else {
        if (this.status === 404) {
          console.log('Default Installation Load Error');
        } else if (this.status === 200) {
          console.log(JSON.parse(this.responseText));
        }
      }
    };
    httpClient.send();
    return JSON.parse(httpClient.responseText);
  }

  getInstallationFullInfo(instID) {
    const httpClient = new XMLHttpRequest();
    httpClient.open('GET', rootURL + 'org/' + instID, false);
    httpClient.setRequestHeader('content-type', 'application/json');
    httpClient.onreadystatechange = function() {
      if (this.readyState !== 4) {
        // insert loading spinner TODO
      } else {
        if (this.status === 404) {
          console.log('specific Installation Load Error');
        } else if (this.status === 200) {
          console.log(JSON.parse(this.responseText));
        }
      }
    };
    httpClient.send();
    return JSON.parse(httpClient.responseText);
  }

  getInstallationInfoTable(dcID, roleValue, renderFunction: Function) {
    const httpClient = new XMLHttpRequest();
    const splitRoles = roleValue.split(';');
    console.log(splitRoles);
    httpClient.open('GET', rootURL + 'userorglist/' + dcID + '/' + splitRoles[0] + '/' + splitRoles[1], true);
    httpClient.setRequestHeader('content-type', 'application/json');
    httpClient.onreadystatechange = function() {
      if (this.readyState !== 4) {
        // insert loading spinner TODO
      } else {
        if (this.status === 404) {
          console.log('installation list Load Error');
        } else if (this.status === 200) {
          const values = JSON.parse(this.responseText);
          renderFunction(values);
        }
      }
    };
    httpClient.send();
  }

  getInstallationRecyclingTypes(setterMethod: Function) {
    const httpClient = new XMLHttpRequest();
    httpClient.open('GET', rootURL + 'recycletype/', true);
    httpClient.setRequestHeader('content-type', 'application/json');
    httpClient.onreadystatechange = function() {
      if (this.readyState !== 4) {
        // insert loading spinner TODO
      } else {
        if (this.status === 404) {
          console.log('recycling types Load Error');
        } else if (this.status === 200) {
          const values = JSON.parse(this.responseText);
          setterMethod(values);
        }
      }
    };
    httpClient.send();
  }

  updateIniInstallation(userID, passID, updateView: Function) {
    // form data package
    const newValue = {
      userId: userID,
      key: 'INSTALLATION',
      value: passID,
      timestamp: null
    };
    const httpClient = new XMLHttpRequest();
    httpClient.open('POST', rootURL + 'userini/', true);
    httpClient.setRequestHeader('content-type', 'application/json');
    httpClient.onreadystatechange = function() {
      if (this.readyState !== 4) {
        // insert loading spinner TODO
      } else {
        if (this.status === 404) {
          console.log('update INI Error');
        } else if (this.status === 200) {
          updateView(passID);
        }
      }
    };
    httpClient.send(JSON.stringify(newValue));
  }

  updateIniDataCall(userID, passID, updateView: Function) {
  // form data package
  const newValue = {
    userId: userID,
    key: 'USER_DATACALL',
    value: passID,
    timestamp: null
  };
  const httpClient = new XMLHttpRequest();
    httpClient.open('POST', rootURL + 'userini/', true);
    httpClient.setRequestHeader('content-type', 'application/json');
    httpClient.onreadystatechange = function() {
    if (this.readyState !== 4) {
      // insert loading spinner TODO
    } else {
      if (this.status === 404) {
        console.log('update INI Error');
      } else if (this.status === 200) {
        updateView(passID);
      }
    }
  };
    httpClient.send(JSON.stringify(newValue));
  }

  updateIniRole(userID, passID, updateView: Function) {
    // form data package
    const newValue = {
      userId: userID,
      key: 'USER_ROLE',
      value: passID,
      timestamp: null
    };
    const httpClient = new XMLHttpRequest();
      httpClient.open('POST', rootURL + 'userini/', true);
      httpClient.setRequestHeader('content-type', 'application/json');
      httpClient.onreadystatechange = function() {
      if (this.readyState !== 4) {
        // insert loading spinner TODO
      } else {
        if (this.status === 404) {
          console.log('update INI Error');
        } else if (this.status === 200) {
          updateView(passID);
        }
      }
    };
      httpClient.send(JSON.stringify(newValue));
    }

// Installation module methods END ---------------------------------- //

// Tenant Management Methods ---------------------------------------- //

  getTenantList(dcID, instID) {
    const httpClient = new XMLHttpRequest();
    httpClient.open('GET', rootURL + 'tenant/' + dcID + '/' + instID, false);
    httpClient.setRequestHeader('content-type', 'application/json');
    httpClient.onreadystatechange = function() {
      if (this.readyState !== 4) {
        // insert loading spinner TODO
      } else {
        if (this.status === 404) {
          console.log('Tenant List Load Error');
        } else if (this.status === 200) {
          console.log(JSON.parse(this.responseText));
        }
      }
    };
    httpClient.send();
    return JSON.parse(httpClient.responseText);
  }

// Tenant Management Methdos END ------------------------------------ //

// USER MANAGEMENT METHODS BLOCK ------------------------------------ //

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
    httpClient.send(JSON.stringify(infoString));
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
    httpClient.send(JSON.stringify(infoString));
  }

// USER MANAGEMENT METHODS END ----------------------------------------- //

// DISPOSAL TRANSACTION METHODS ---------------------------------------- //

  // Fetch disposal transaction list based on instId and datacall
  getDisposalTransactionList(instId, dcId, renderFunction) {
    // populate the disposal transaction list
    let itemValue;
    const httpClient = new XMLHttpRequest();
    httpClient.open('GET', rootURL + 'disposal/getAllDisposalByDcIdAndInstId?instId=' + instId + '&dcId=' + dcId, true);
    httpClient.setRequestHeader('content-type', 'application/json');
    httpClient.onreadystatechange = function() {
      if (this.readyState !== 4) {
        // insert loading spinner TODO
      } else {
        if (this.status === 404) {
          console.log('404 error, get DTlist');
        } else if (this.status === 200) {
          itemValue = httpClient.responseText;
          renderFunction(itemValue);
        }
      }
    };
    httpClient.send();
  }

  // POST METHODS
  createEditDisposalTransaction(itemValue, navigateFunction) {
    // populate the disposal transaction list
    const httpClient = new XMLHttpRequest();
    httpClient.open('POST', rootURL + 'disposal/', true);
    httpClient.setRequestHeader('content-type', 'application/json');
    httpClient.onreadystatechange = function() {
      if (this.readyState !== 4) {
        // insert loading spinner TODO
      } else {
        if (this.status === 404) {
          console.log('404 error, createDT');
        } else if (this.status === 200) {
          navigateFunction();
        }
      }
    };
    console.log(JSON.stringify(itemValue));
    httpClient.send(JSON.stringify(itemValue));
  }

  // DELETE METHOD
  deleteDisposalTransaction(itemValue, renderFunction) {
        // populate the disposal transaction list
        const httpClient = new XMLHttpRequest();
        httpClient.open('DELETE', rootURL + 'disposal/', true);
        httpClient.setRequestHeader('content-type', 'application/json');
        httpClient.onreadystatechange = function() {
          if (this.readyState !== 4) {
        // insert loading spinner TODO
          } else {
            if (this.status === 404) {
              console.log('404 error, deleteDT');
            } else if (this.status === 200) {
              returnDTList(itemValue.instId, itemValue.dcId, renderFunction);
            }
          }
        };
        httpClient.send(JSON.stringify(itemValue));
  }

  // FACILITY METHOD
  getFacilityList(dataCallID, instID, setterMethod: Function) {
    const httpClient = new XMLHttpRequest();
    httpClient.open('GET', rootURL + 'facility/' + dataCallID + '/' + instID, true);
    httpClient.setRequestHeader('content-type', 'application/json');
    httpClient.onreadystatechange = function() {
      if (this.readyState !== 4) {
        // insert loading spinner TODO
      } else {
        if (this.status === 404) {
          console.log('404 error, get Facility List');
        } else if (this.status === 200) {
          setterMethod(JSON.parse(this.responseText));
        }
      }
    };
    httpClient.send();
  }

// DISPOSAL TRANSACTION METHODS END ------------------------------------- //

// RECYCLING TRANSACTION METHODS ---------------------------------------- //

  getRecyclingTransactionList(instID, dcID, renderFunction: Function) {
      // populate the disposal transaction list
      let itemValue;
      const httpClient = new XMLHttpRequest();
      httpClient.open('GET', rootURL + 'recycle/getAllRecycleByDcIdAndInstId?instId=' + instID + '&dcId=' + dcID, true);
      httpClient.setRequestHeader('content-type', 'application/json');
      httpClient.onreadystatechange = function() {
        if (this.readyState !== 4) {
          // insert loading spinner TODO
        } else {
          if (this.status === 404) {
            console.log('404 error, get RTlist');
          } else if (this.status === 200) {
            itemValue = httpClient.responseText;
            renderFunction(itemValue);
          }
        }
      };
      httpClient.send();
  }

  createEditRecyclingTransaction(itemValue, navigateFunction) {
    // populate the disposal transaction list
    const httpClient = new XMLHttpRequest();
    httpClient.open('POST', rootURL + 'recycle/', true);
    httpClient.setRequestHeader('content-type', 'application/json');
    httpClient.onreadystatechange = function() {
      if (this.readyState !== 4) {
        // insert loading spinner TODO
      } else {
        if (this.status === 404) {
          console.log('404 error, createRT');
        } else if (this.status === 200) {
          navigateFunction();
        }
      }
    };
    console.log(JSON.stringify(itemValue));
    httpClient.send(JSON.stringify(itemValue));
  }

  deleteRecycleTransaction(eventTarget, renderFunction: Function) {
    const httpClient = new XMLHttpRequest();
    httpClient.open('DELETE', rootURL + 'recycle/', true);
    httpClient.setRequestHeader('content-type', 'application/json');
    httpClient.onreadystatechange = function() {
      if (this.readyState !== 4) {
    // insert loading spinner TODO
      } else {
        if (this.status === 404) {
          console.log('404 error, deleteRT');
        } else if (this.status === 200) {
          returnRTList(eventTarget.instId, eventTarget.dcId, renderFunction);
        }
      }
    };
    httpClient.send(JSON.stringify(eventTarget));
  }

// RECYCLING TRANSACTION METHODS END ------------------------------------ //

// DATA CALL TRANSACTION METHODS ---------------------------------------- //

  // GET requests
  getDataCallInfoTable(renderFunction: Function) {
    // return user info to populate datacall list
    let tableValues;
    const httpClient = new XMLHttpRequest();
    httpClient.open('GET', rootURL + 'dc/', true);
    httpClient.setRequestHeader('content-type', 'application/json');
    httpClient.onreadystatechange = function() {
      if (this.readyState !== 4) {
        // insert loading spinner TODO
      } else {
        if (this.status === 404) {
          tableValues = '[{"dcId":"Error","serviceId":"Error","ID":"404","title":"Error"}]';
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

  // ARCHIVE/UNARCHIVE requests

  deactivateDataCall(dataCallID, renderFunction: Function) {
    const httpClient = new XMLHttpRequest();
    httpClient.open('GET', rootURL + 'dc/archive/' + dataCallID, true);
    httpClient.setRequestHeader('content-type', 'application/json');
    httpClient.onreadystatechange = function() {
      if (this.readyState !== 4) {
        // insert loading spinner TODO
      } else {
        getDataCallTableLocal(renderFunction);
      }
    };
    httpClient.send();
  }

  activateDataCall(dataCallID, renderFunction: Function) {
    const httpClient = new XMLHttpRequest();
    httpClient.open('GET', rootURL + 'dc/unarchive/' + dataCallID, true);
    httpClient.setRequestHeader('content-type', 'application/json');
    httpClient.onreadystatechange = function() {
      if (this.readyState !== 4) {
        // insert loading spinner TODO
      } else {
        getDataCallTableLocal(renderFunction);
      }
    };
    httpClient.send();
  }

  updateDataCall(infostring) {
    const httpClient = new XMLHttpRequest();
    httpClient.open('POST', rootURL + 'dc/', false);
    httpClient.setRequestHeader('content-type', 'application/json');
    httpClient.send(infostring);
  }

  // DATACALL Methods end ----------------------------------------------------------//

}
