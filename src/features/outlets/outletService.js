import {
  outletsLoading,
  outletsFetched,
  outletsFetchedError,
  outletToggledCallForOn,
  requestedChairsFetched
} from './outletsSlice'

const outletService = (dispatch)=> {

  let outletHeaders= new Headers();
  outletHeaders.append('accept','application/json');
  outletHeaders.append('X-CSRF','x');
  outletHeaders.append('Content-type','application/x-www-form-urlencoded');
  outletHeaders.append('Authorization', 'Basic ' + btoa("admin:1234"));

  let ipAddress = "192.168.1.200";
  
  const chairIds = ["One","Two","Three","Four","Five","Six","Seven","Eight"];
  
  const fetchOutlets= () => {
    fetch('http://' + ipAddress + '/restapi/relay/outlets/all;',
        {headers:outletHeaders}
        )
      .then(res => res.json())
      .then(res => {
        if(res.error) {
          throw(res.error);
        }
        console.log(JSON.stringify(res));
        dispatch(outletsFetched(res));
        return res;
      })
      .catch(error => {
        dispatch(outletsFetchedError("error"));
      })
  }

  //curl -H "Accept: application/json" --digest \ 'http://admin:1234@192.168.0.100/restapi/relay/outlets/=0,1,4/state/'

  const toggleCallForOn = (outlet) => {
    let scriptName = '';
    debugger;
    if (outlet.callForOn) {
      scriptName = "chairOff" + chairIds[outlet.id];
    } else {
      scriptName = "requestChair" + chairIds[outlet.id];
    }
    callScript(scriptName,outlet)
  }

  const callScript = (scriptName,outlet) => {
    fetch('http://' + ipAddress + '/script.cgi', {
      method: 'POST', 
      headers: outletHeaders,
      body: "start=Start&user_function=" + scriptName,
    })
      .then(response => {
        console.log('SuccessToggle:', response);
        dispatch(outletToggledCallForOn(outlet))
      })
      .catch((error) => {
        console.error('ErrorToggle:', error);
      });
  }

  const  getRequestedChairs = async () => {
// {"chairRequest1":true,"chairRequest3":false,"chairRequest2":true,"bunny":"I'm fluffy"}
    let response = await  fetch('http://' + ipAddress + '/restapi/script/variables/', {
      method: 'GET', // or 'PUT'
      headers: outletHeaders
    })
    if (response.ok) {
      const data = await response.json();
      dispatch(requestedChairsFetched(data));
    }
  }

  const setOutlet = (outlet,on) => {
    fetch('http://' + ipAddress + '/restapi/relay/outlets/='+outlet+'/state/', {
      method: 'PUT', // or 'PUT'
      headers: outletHeaders,
      body: "value=" + on,
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
  return {
    toggleCallForOn: toggleCallForOn,
    fetchOutlets: fetchOutlets,
    setOutlet: setOutlet,
    getRequestedChairs: getRequestedChairs
  }

}

export default outletService;
