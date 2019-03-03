import { Component, OnInit, OnDestroy } from '@angular/core';
import { Config } from './../../shared/data.model';
import { ConfigService } from './../../shared/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pumpings',
  templateUrl: './pumpings.component.html',
  styleUrls: ['./pumpings.component.css'],
  providers: [ConfigService]
})
export class PumpingsComponent implements OnInit, OnDestroy {

  configs: Config[] = [];
  private postsSub: Subscription;
  isLoading: boolean = true;

  primaryObj = {
    slave_id: 0,
    default_Freq: 0,
    Ramp_up: 0,
    Ramp_down: 0,
    Function_code: '',
    Address: '',
    Running_Frequency: 0
  }

  secondaryObj = {
    slave_id: 0,
    default_Freq: 0,
    Ramp_up: 0,
    Ramp_down: 0,
    Function_code: '',
    Address: '',
    Running_Frequency: 0
  }

  constructor(public configService: ConfigService) { }

  ngOnInit() {
    console.log('calling of getconfigs')
    this.getConfigs();
  }

  getConfigs(): void {
    // const id = +this.route.snapshot.paramMap.get('id');
    console.log('inside of getconfigs')
    this.configService.getConfigs('all/')
      .subscribe(config => {
        // console.log('config ', config[0])
        config.forEach((eachConf) => {
          console.log(eachConf)
          if (eachConf.slave_id == 1) {
            this.primaryObj = eachConf;
          }
          else {
            this.secondaryObj = eachConf;
          }
        })
      });
  }

  PrimarySubmit = ($event) => {
    if (this.primaryObj.slave_id) {
      console.log(this.primaryObj);
      this.configService.addConfig(this.primaryObj, 'primary')
        .subscribe(config => {
          console.log(config)
        });
    }
  };

  SecondarySubmit = ($event) => {
    if (this.secondaryObj.slave_id) {
      console.log(this.secondaryObj);
      let tempObj = {
        
      }
      this.configService.addConfig(this.secondaryObj, 'secondary')
        .subscribe(config => {
          console.log(config)
        });
    }
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

  // onDelete(postId: string) {
  //   this.postsService.deletePost(postId);
  // }
}
