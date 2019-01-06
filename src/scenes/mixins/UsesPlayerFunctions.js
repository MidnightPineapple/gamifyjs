import { compose } from 'ramda';
import HandlesErrors from './HandlesErrors';

export default superclass => class UsesPlayerFunctions extends compose(HandlesErrors)(superclass) {

}