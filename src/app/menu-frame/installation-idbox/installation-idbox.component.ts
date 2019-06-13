import { Component, OnInit } from '@angular/core';
import { RESTClient } from 'src/app/json-client.service';
import { InstallationServiceService } from 'src/app/dataentry-services/installation-service.service';

@Component({
  selector: 'app-installation-idbox',
  templateUrl: './installation-idbox.component.html',
  styleUrls: ['./installation-idbox.component.css']
})
export class InstallationIdboxComponent implements OnInit {

  constructor(private restClient: RESTClient,
              private installService: InstallationServiceService) { }

  ngOnInit() {
    const defaultInfoPacket: any = this.restClient.getDefaultSession();
    // map needed values
    const sUserId = defaultInfoPacket[0].userId;
    let sInstId;
    let sDcId;
    let sUserRole;
    for (let i = 0; i < defaultInfoPacket.length; i++) {
      if (defaultInfoPacket[i].key === 'USER_DATACALL') {
        sDcId = defaultInfoPacket[i].value;
      } else if (defaultInfoPacket[i].key === 'INSTALLATION') {
        sInstId = defaultInfoPacket[i].value;
      } else if (defaultInfoPacket[i].key === 'USER_ROLE') {
        sUserRole = defaultInfoPacket[i].value;
      }
    }
    // populate session with information.
    const instInfo = this.restClient.getInstallationFullInfo(sInstId);
    const tenantInfo = this.restClient.getTenantList(sDcId, sInstId);
    const recyclingInfo = this.restClient.getInstallationRecyclingTypes(sInstId); // TODO Request update to SW_WST_REC_TYPE GET to allow sort by inst.

    // redirect if no default, OR set default TODO
    this.installService.SetChosenInstallation(sDcId, sInstId, sUserId, sUserRole, tenantInfo);
    console.log(sDcId, sInstId, sUserId, sUserRole, tenantInfo);

  }

}
