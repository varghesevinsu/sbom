function getCode(data) {
    let outputStr = `stateDiagram`;
    const deps = data.dependencies[0];
    outputStr += `\n\t ${deps.ref} --> 0`;
    for (var i = 0; i < deps.dependsOn.length; i++) {
        const dep = deps.dependsOn[i];
        outputStr += `\n\t ${deps.ref} --> ${dep.replaceAll("-", "_")}`;
        var childDep = _.filter(data.dependencies, { ref: dep });
        if (childDep.length) {
            outputStr += drawChildDep(data.dependencies, childDep[0]);
        }
    }
    console.log(outputStr)
    return outputStr;
}

function drawChildDep(data, childDep) {
    console.log(childDep);
    let outputStr = ``;
    for (let i = 0; i < childDep.dependsOn?.length; i++) {
        const dep = childDep.dependsOn[i];
        outputStr += `\n\t ${childDep.ref.replaceAll("-", "_")} --> ${dep?.replaceAll("-", "_")}`;
    }
    return outputStr;
}

function getTabularOutput(deps) {
    let tbl = `<table class='table' valign="top">
    <thead>
        <tr>
            <th>Package</th>
            <th>Depends On</th>
        </tr>
    </thead>
    <tbody>
    `
    for (let i = 0; i < deps?.length; i++) {
        const dep = deps[i];
        tbl += `<tr>
            <td>${dep.ref}</td>
            <td>${getSubTable(dep.dependsOn)}</td>
        </tr>`
    }
    tbl += "</tbody></table>";
    return tbl;
}

function getSubTable(deps) {
    let tbl = `<ul class="list-group">`;
    for (let i = 0; i < deps?.length; i++) {
        tbl += `<li class="list-group-item">${deps[i]}</li>`;
    }
    tbl += `</ul>`;
    return tbl;
}