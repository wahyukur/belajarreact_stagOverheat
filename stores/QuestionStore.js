import { observable } from 'mobx';
import { ListView } from 'react-native';
import Rest from 'fetch-on-rest';

class QuestionStore {
	
	@observable dataSource;
	@observable question = {};
	@observable dataSourceAnswers;

	constructor(){
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.dataSource = ds.cloneWithRows([]);
		this.dataSourceAnswers = ds.cloneWithRows([]);
		this.api = new Rest("https://stag-over.000webhostapp.com/api/v1/");
		this.refresh();

	}

	findOne(id){
		const self = this;

		this.api.get('question/'+id).then(function(response){
			self.question = response;
		});
	}

	add(doc){
		this.api.post('question', doc);
	}

	addAnswer(questionId, doc){
		const self=this;
		this.api.post('question/'+questionId+'/answers', doc).then(function(response){
			self.findAnswers(questionId);
		});
	}
	findAnswers(questionId){
		const self=this;
		this.api.get('question/'+questionId+'/answers').then(function(response){
			self.dataSourceAnswers=self.dataSourceAnswers.cloneWithRows(response);
		});
	}

	search(search){
		//inisialisasi variable;
		const self=this;

		//call api
		this.api.get('question', {search: search}).then(function(response) {
			self.dataSource=self.dataSource.cloneWithRows(response);
		});
	}

	update(id, doc){
		// initiate this to self variable
		const self = this;

		// call api PUT to web
		this.api.put('question/'+id, doc).then(function(){
			// call method findOne from this class
			self.findOne(id);
		});
	}

	// replace dataSource with new questions array
	refresh(){
		const self = this;
		this.api.get('question').then(function(response){
			self.dataSource = self.dataSource.cloneWithRows(response);
		});
	}
}

const questionStore = new QuestionStore();
export default questionStore;
