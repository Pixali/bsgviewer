using System;
using spaar.ModLoader;
using UnityEngine;
using System.IO;
using System.Collections.Generic;

namespace PrefabDataDumper
{

    // If you need documentation about any of these values or the mod loader
    // in general, take a look at https://spaar.github.io/besiege-modloader.

    public class PDDLoader : Mod
    {
        public override string Name { get; } = "PrefabDataDumper";
        public override string DisplayName { get; } = "PDD";
        public override string Author { get; } = "Pixali";
        public override Version Version { get; } = new Version(1, 0, 0);

        public override void OnLoad()
        {
            // Your initialization code here
            PDD.Initialize();
            UnityEngine.Object.DontDestroyOnLoad(PDD.Instance);
        }

        public override void OnUnload()
        {
            // Your code here
            // e.g. save configuration, destroy your objects if CanBeUnloaded is true etc
        }
    }
    public class PDD : spaar.ModLoader.SingleInstance<PDD>
    {
        public override string Name
        {
            get
            {
                return "PDD Instance";
            }
        }

        public struct PData
        {
            public Vector3 pos, scale;
            public Quaternion rot;
            public string name;
        }

        void Update()
        {
            if (Input.GetKeyDown(KeyCode.J))
            {
                Dictionary<int, PData> dict = new Dictionary<int, PData>();
                List<string> lines = new List<string>();
                foreach (var x in PrefabMaster.BlockPrefabs)
                {
                    var t = x.Value.gameObject.transform.FindChild("Vis");
                    if (!t) continue;
                    dict.Add(x.Key, new PData() { name = x.Value.name, pos = t.localPosition, rot = t.localRotation, scale = t.localScale });
                }
                foreach (var x in dict)
                {
                    lines.Add(string.Format(
                        "\"{0}\": {{ " +
                        "\"name\": \"{1}\", " +
                        "\"pos\": {{ \"x\":{2}, \"y\":{3}, \"z\":{4} }}, " +
                        "\"rot\": {{ \"x\":{5}, \"y\":{6}, \"z\":{7}, \"w\":{8} }}, " +
                        "\"scale\": {{ \"x\":{9}, \"y\":{10}, \"z\":{11} }}, " +
                        "\"objpath\": \"Skins/Template/{1}/{12}.obj\", " +
                        "\"texpath\": \"Skins/Template/{1}/{12}tex_png.png\" }},",
                        x.Key,
                        x.Value.name,
                        x.Value.pos.x, x.Value.pos.y, x.Value.pos.z,
                        x.Value.rot.x, x.Value.rot.y, x.Value.rot.z, x.Value.rot.w,
                        x.Value.scale.x, x.Value.scale.y, x.Value.scale.z,
                        x.Value.name.ToLower()
                        ));
                }

                File.WriteAllLines(Application.dataPath + "/PDD.txt", lines.ToArray());
            }
            else if (Input.GetKeyDown(KeyCode.U))
            {
                //var GO = GameObject.Find("LEVEL BARREN EXPANSE").transform.Find("FloorBig");
                //var mr = GO.GetComponent<MeshRenderer>();
                //Debug.Log(GO.GetComponent<MeshRenderer>().material.shader);
                //GameObject go = new GameObject("CubemapCamera");
                //var cam = go.AddComponent<Camera>(); //cam.enabled = false;
                // place it on the object
                var go = GameObject.Find("Main Camera");
                var cam = go.GetComponent<Camera>();

                var cube = new Cubemap(512, TextureFormat.RGB24, false);

                go.transform.position = new Vector3(0, 0, 0);
                go.transform.rotation = Quaternion.identity;
                //go.transform.forward = -Vector3.up;
                var t = go.transform;
                //RenderTexture rt = new RenderTexture(512, 512, 24);
                //cam.targetTexture = rt;
                string path = Application.dataPath + "/besiegeCube/";
                
                List<rDS> renderDirs = new List<rDS>()
                {
                    new rDS() { CF = CubemapFace.PositiveX, v3 = Vector3.right, dir = "px" },
                    new rDS() { CF = CubemapFace.PositiveY, v3 = Vector3.up, dir = "py" },
                    new rDS() { CF = CubemapFace.PositiveZ, v3 = Vector3.forward, dir = "pz" },
                    new rDS() { CF = CubemapFace.NegativeX, v3 = -Vector3.right, dir = "nx" },
                    new rDS() { CF = CubemapFace.NegativeY, v3 = -Vector3.up, dir = "ny" },
                    new rDS() { CF = CubemapFace.NegativeZ, v3 = -Vector3.forward, dir = "nz" }
                };
                //RenderTexture tempRT = RenderTexture.active;
                //RenderTexture.active = cam.targetTexture;
                //cam.RenderToCubemap(cube);
                Texture2D image = new Texture2D(512, 512);
                foreach (var kv in renderDirs)
                {
                    //cam.fieldOfView = 90;
                    //t.position = Vector3.zero;
                    //t.forward = kv.Key;
                    //cam.Render();
                    //image.ReadPixels(new Rect(0, 0, cam.targetTexture.width, cam.targetTexture.height), 0, 0);
                    //image.Apply();
                    t.forward = kv.v3;
                    cam.RenderToCubemap(cube);
                    image.SetPixels(cube.GetPixels(kv.CF));
                    File.WriteAllBytes(path + kv.dir + ".png", image.EncodeToPNG());
                }
                //RenderTexture.active = tempRT;
                Destroy(image);
                //cam.targetTexture = null;
                //Destroy(go);
            }
        }
        public struct rDS
        {
            public CubemapFace CF;
            public Vector3 v3;
            public string dir;
        }
    }
}
