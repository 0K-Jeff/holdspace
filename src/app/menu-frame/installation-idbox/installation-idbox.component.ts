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
    // bind method arguments
    this.recycleSetter = this.recycleSetter.bind(this);
    this.facilitySetter = this.facilitySetter.bind(this);

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
    const tenantInfo = this.restClient.getTenantList(sDcId, sInstId);
    this.restClient.getInstallationRecyclingTypes(this.recycleSetter);
    this.restClient.getFacilityList(sDcId, sInstId, this.facilitySetter);
    this.installService.SetChosenInstallation(sDcId, sInstId, sUserId, sUserRole, tenantInfo);
  }

  recycleSetter(recyclingInfo) {
    this.installService.SetRecyclingTypes(recyclingInfo);
    console.log(recyclingInfo);
  }

  facilitySetter(facilityInfo) {
    this.installService.SetFacilities(facilityInfo);
  }
}
