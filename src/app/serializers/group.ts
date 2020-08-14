import { Group } from '../models/group';

interface GroupSerializer {
    name: string;
    members: Array<String>;
}

const show = (group: Group): GroupSerializer => {
    return {
        name: group.name,
        members: group.members
    };
};

const index = (groups: Array<Group>): Array<GroupSerializer> => {
    return groups.map(group => show(group));
};

export default {
    show,
    index
};
