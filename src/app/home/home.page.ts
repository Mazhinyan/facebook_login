import { Component } from '@angular/core';
import { Facebook } from '@ionic-native/facebook/ngx';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: [ 'home.page.scss' ]
})
export class HomePage {
	constructor(private fb: Facebook) {
		fb
			.getLoginStatus()
			.then((res) => {
				console.log(res.status);
				if (res.status === 'connect') {
					this.isLoggedIn = true;
				} else {
					this.isLoggedIn = false;
				}
			})
			.catch((e) => console.log(e));
	}
	isLoggedIn: boolean = false;
	users: any;
	data: string;
	hashtags_list: any;
	login() {
		this.fb
			.login([ 'public_profile', 'user_friends', 'email' ])
			.then((res) => {
				if (res.status === 'connected') {
					this.isLoggedIn = true;
					this.getUserDetail(res.authResponse.userID);
					alert('your user id is ' + res.authResponse.userID);
				} else {
					this.isLoggedIn = false;
				}
			})
			.catch((e) => console.log('Error logging into Facebook', e));
	}
	logout() {
		this.fb
			.logout()
			.then((res) => (this.isLoggedIn = false))
			.catch((e) => console.log('Error logout from Facebook', e));
	}
	getUserDetail(userid) {
		this.fb
			.api('/' + userid + '/?fields=id,email,name,picture,gender', [ 'public_profile' ])
			.then((res) => {
				this.users = res;
			})
			.catch((e) => {
				console.log(e);
			});
	}

	mySearch() {
		let userid = this.users.id;
		this.fb
			.api('/ig_hashtag_search?user_id=' + userid + '&q={q}' + this.data, [ 'public_profile' ])
			// {user-id}&q={q}
			.then((res) => {
				this.hashtags_list = res;
			})
			.catch((e) => {
				console.log(e);
			});
	}
}
