const { existsSync, readdirSync, readFileSync } = require("fs")
const { resolve } = require("path")
const gitLabels = require("git-labels")

function readLabels(folder) {
  const fileNames = readdirSync(folder, "utf8")

  let labels = []
  fileNames.forEach((fileName) => {
    const filePath = resolve(folder, fileName)
    const raw = readFileSync(filePath, "utf8")
    const data = JSON.parse(raw)
    labels = labels.concat(data)
  })

  return labels
}

;(async function() {
  const project = "marcodeltongo/github-labels"
  const token = process.env.GITHUB_TOKEN

  const folder = "./labels"
  const labels = readLabels(folder)

  if (existsSync("./projects.json")) {
    const raw = readFileSync(filePath, "utf8")
    const projects = JSON.parse(raw)

    projects.forEach(async (project) => {
      await gitLabels({ project, labels, token })
      console.log(`Labels imported into ${project}.`)
    })
    return
  }

  await gitLabels({ project, labels, token })
  console.log(`Labels imported into ${project}.`)
})()
