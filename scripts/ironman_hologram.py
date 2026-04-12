"""
Iron Man Holographic Wireframe Bust — Blender Python Script
============================================================
HOW TO USE:
1. Open Blender
2. Go to the Scripting tab
3. Paste this entire script
4. Click "Run Script"
5. Switch to Rendered view (Z > Rendered) to see the glow

Tested with Blender 3.x / 4.x
"""

import bpy
import bmesh
import math
from mathutils import Vector

# ─────────────────────────────────────────
#  UTILS
# ─────────────────────────────────────────

def clear_scene():
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.delete()
    for col in bpy.data.collections:
        bpy.data.collections.remove(col)

def new_mat(name, r, g, b, strength=5.0):
    """Create an emission material with the given colour."""
    mat = bpy.data.materials.new(name=name)
    mat.use_nodes = True
    nodes = mat.node_tree.nodes
    links = mat.node_tree.links
    nodes.clear()
    emission = nodes.new("ShaderNodeEmission")
    emission.inputs["Color"].default_value = (r, g, b, 1.0)
    emission.inputs["Strength"].default_value = strength
    output = nodes.new("ShaderNodeOutputMaterial")
    links.new(emission.outputs["Emission"], output.inputs["Surface"])
    return mat

def assign_mat(obj, mat):
    if obj.data.materials:
        obj.data.materials[0] = mat
    else:
        obj.data.materials.append(mat)

def add_wireframe(obj, thickness=0.02):
    wf = obj.modifiers.new(name="Wireframe", type='WIREFRAME')
    wf.thickness = thickness
    wf.use_even_offset = True

def apply_subsurf(obj, levels=2):
    mod = obj.modifiers.new(name="Subsurf", type='SUBSURF')
    mod.levels = levels
    mod.render_levels = levels

# ─────────────────────────────────────────
#  MATERIALS
# ─────────────────────────────────────────

CYAN        = (0.0,  0.9,  1.0)
CYAN_DIM    = (0.0,  0.6,  0.8)
RED_GLOW    = (1.0,  0.05, 0.05)
WHITE_GLOW  = (0.8,  1.0,  1.0)
GOLD        = (1.0,  0.7,  0.0)

# ─────────────────────────────────────────
#  SCENE SETUP
# ─────────────────────────────────────────

clear_scene()

# World — dark background with slight blue tint
world = bpy.data.worlds["World"]
world.use_nodes = True
bg = world.node_tree.nodes["Background"]
bg.inputs["Color"].default_value = (0.0, 0.01, 0.03, 1.0)
bg.inputs["Strength"].default_value = 0.05


# ─────────────────────────────────────────
#  1. HELMET
# ─────────────────────────────────────────

# Base sphere → sculpt into helmet shape via scale
bpy.ops.mesh.primitive_uv_sphere_add(
    segments=32, ring_count=24,
    radius=1.0, location=(0, 0, 2.6)
)
helmet = bpy.context.active_object
helmet.name = "Helmet"

# Flatten front face, elongate vertically
helmet.scale = (0.82, 0.78, 1.0)

# Enter edit mode — flatten bottom of helmet (neck line)
bpy.ops.object.mode_set(mode='EDIT')
bm = bmesh.from_edit_mesh(helmet.data)
for v in bm.verts:
    if v.co.z < -0.75:
        v.co.z = -0.75  # flat neck cut
bmesh.update_edit_mesh(helmet.data)
bpy.ops.object.mode_set(mode='OBJECT')

apply_subsurf(helmet, 1)
add_wireframe(helmet, 0.018)
assign_mat(helmet, new_mat("HoloCyan", *CYAN, strength=6))


# ─────────────────────────────────────────
#  2. FACEPLATE DETAILS
# ─────────────────────────────────────────

# Eye slits — two thin boxes
for side in [-1, 1]:
    bpy.ops.mesh.primitive_cube_add(
        size=1,
        location=(side * 0.28, -0.72, 2.72)
    )
    eye = bpy.context.active_object
    eye.name = f"Eye_{side}"
    eye.scale = (0.22, 0.04, 0.06)
    assign_mat(eye, new_mat("EyeGlow", *WHITE_GLOW, strength=20))

# Chin plate
bpy.ops.mesh.primitive_cube_add(size=1, location=(0, -0.72, 2.25))
chin = bpy.context.active_object
chin.name = "Chin"
chin.scale = (0.35, 0.04, 0.12)
add_wireframe(chin, 0.015)
assign_mat(chin, new_mat("ChinCyan", *CYAN_DIM, strength=4))

# Cheek plates
for side in [-1, 1]:
    bpy.ops.mesh.primitive_cube_add(size=1, location=(side * 0.6, -0.58, 2.55))
    chk = bpy.context.active_object
    chk.name = f"Cheek_{side}"
    chk.scale = (0.18, 0.05, 0.25)
    chk.rotation_euler.z = math.radians(side * 10)
    add_wireframe(chk, 0.015)
    assign_mat(chk, new_mat("CheekCyan", *CYAN_DIM, strength=4))


# ─────────────────────────────────────────
#  3. NECK
# ─────────────────────────────────────────

bpy.ops.mesh.primitive_cylinder_add(
    vertices=16, radius=0.38, depth=0.4,
    location=(0, 0, 1.85)
)
neck = bpy.context.active_object
neck.name = "Neck"
add_wireframe(neck, 0.015)
assign_mat(neck, new_mat("NeckCyan", *CYAN_DIM, strength=4))


# ─────────────────────────────────────────
#  4. CHEST / TORSO
# ─────────────────────────────────────────

bpy.ops.mesh.primitive_uv_sphere_add(
    segments=24, ring_count=18,
    radius=1.0, location=(0, 0, 0.55)
)
torso = bpy.context.active_object
torso.name = "Torso"
torso.scale = (1.15, 0.72, 1.35)

# Flatten torso bottom
bpy.ops.object.mode_set(mode='EDIT')
bm = bmesh.from_edit_mesh(torso.data)
for v in bm.verts:
    if v.co.z < -0.9:
        v.co.z = -0.9
bmesh.update_edit_mesh(torso.data)
bpy.ops.object.mode_set(mode='OBJECT')

apply_subsurf(torso, 1)
add_wireframe(torso, 0.02)
assign_mat(torso, new_mat("TorsoCyan", *CYAN, strength=5))


# ─────────────────────────────────────────
#  5. SHOULDER PLATES
# ─────────────────────────────────────────

for side in [-1, 1]:
    bpy.ops.mesh.primitive_uv_sphere_add(
        segments=16, ring_count=12,
        radius=0.55, location=(side * 1.45, 0, 1.2)
    )
    shoulder = bpy.context.active_object
    shoulder.name = f"Shoulder_{side}"
    shoulder.scale = (0.9, 0.65, 0.7)
    add_wireframe(shoulder, 0.018)
    assign_mat(shoulder, new_mat("ShoulderCyan", *CYAN, strength=5))

    # Upper arm stub
    bpy.ops.mesh.primitive_cylinder_add(
        vertices=12, radius=0.32, depth=0.7,
        location=(side * 1.6, 0, 0.55)
    )
    arm = bpy.context.active_object
    arm.name = f"UpperArm_{side}"
    arm.rotation_euler.z = math.radians(side * 15)
    add_wireframe(arm, 0.015)
    assign_mat(arm, new_mat("ArmCyan", *CYAN_DIM, strength=4))


# ─────────────────────────────────────────
#  6. CHEST PANEL DETAILS (red lines)
# ─────────────────────────────────────────

# Horizontal rib lines across chest
for i, z_pos in enumerate([0.9, 0.55, 0.2]):
    bpy.ops.mesh.primitive_cylinder_add(
        vertices=6, radius=0.95, depth=0.025,
        location=(0, 0, z_pos)
    )
    rib = bpy.context.active_object
    rib.name = f"Rib_{i}"
    rib.scale = (1.0, 0.65, 1.0)
    assign_mat(rib, new_mat(f"RibRed_{i}", *RED_GLOW, strength=3))

# Vertical sternum line
bpy.ops.mesh.primitive_cube_add(size=1, location=(0, -0.68, 0.55))
sternum = bpy.context.active_object
sternum.name = "Sternum"
sternum.scale = (0.04, 0.02, 0.7)
assign_mat(sternum, new_mat("SternumRed", *RED_GLOW, strength=3))


# ─────────────────────────────────────────
#  7. ARC REACTOR
# ─────────────────────────────────────────

arc_z = 0.62
arc_y = -0.68

# Outer rings
for i, (r, thick) in enumerate([(0.28, 0.025), (0.22, 0.02), (0.16, 0.018)]):
    bpy.ops.mesh.primitive_torus_add(
        major_radius=r,
        minor_radius=thick,
        major_segments=48,
        minor_segments=8,
        location=(0, arc_y, arc_z)
    )
    ring = bpy.context.active_object
    ring.name = f"ArcRing_{i}"
    strength = 8 + i * 2
    assign_mat(ring, new_mat(f"ArcRing_mat_{i}", *WHITE_GLOW, strength=strength))

# Inner glowing disc
bpy.ops.mesh.primitive_cylinder_add(
    vertices=24, radius=0.1, depth=0.02,
    location=(0, arc_y, arc_z)
)
core = bpy.context.active_object
core.name = "ArcCore"
assign_mat(core, new_mat("ArcCore", 0.5, 1.0, 1.0, strength=25))

# Spoke details inside reactor
for angle in range(0, 360, 45):
    rad = math.radians(angle)
    x = math.cos(rad) * 0.16
    z = arc_z + math.sin(rad) * 0.16
    bpy.ops.mesh.primitive_cube_add(size=1, location=(x, arc_y, z))
    spoke = bpy.context.active_object
    spoke.name = f"Spoke_{angle}"
    spoke.scale = (0.015, 0.01, 0.07)
    spoke.rotation_euler.y = rad
    assign_mat(spoke, new_mat(f"Spoke_mat_{angle}", *WHITE_GLOW, strength=10))


# ─────────────────────────────────────────
#  8. COLLAR / NECK RING
# ─────────────────────────────────────────

bpy.ops.mesh.primitive_torus_add(
    major_radius=0.52,
    minor_radius=0.055,
    major_segments=32,
    minor_segments=8,
    location=(0, 0, 1.62)
)
collar = bpy.context.active_object
collar.name = "Collar"
assign_mat(collar, new_mat("CollarCyan", *CYAN, strength=7))


# ─────────────────────────────────────────
#  9. BASE PLATFORM (optional hologram base)
# ─────────────────────────────────────────

bpy.ops.mesh.primitive_cylinder_add(
    vertices=64, radius=1.6, depth=0.04,
    location=(0, 0, -0.82)
)
base = bpy.context.active_object
base.name = "HoloBase"
assign_mat(base, new_mat("HoloBase", *CYAN_DIM, strength=2))

# Rings on the base
for r in [0.6, 1.0, 1.4]:
    bpy.ops.mesh.primitive_torus_add(
        major_radius=r, minor_radius=0.015,
        major_segments=64, minor_segments=6,
        location=(0, 0, -0.8)
    )
    br = bpy.context.active_object
    br.name = f"BaseRing_{r}"
    assign_mat(br, new_mat(f"BaseRing_mat_{r}", *CYAN, strength=4))


# ─────────────────────────────────────────
#  10. CAMERA
# ─────────────────────────────────────────

bpy.ops.object.camera_add(location=(0, -5.5, 1.2))
cam = bpy.context.active_object
cam.name = "Camera"
cam.rotation_euler = (math.radians(88), 0, 0)
bpy.context.scene.camera = cam

# Slight upward tilt to face the bust
cam.data.lens = 60


# ─────────────────────────────────────────
#  11. RENDER SETTINGS (Cycles + Bloom)
# ─────────────────────────────────────────

scene = bpy.context.scene
scene.render.engine = 'CYCLES'
scene.cycles.samples = 128

# Enable bloom via compositor
scene.use_nodes = True
scene.view_settings.view_transform = 'Filmic'

# NOTE: Bloom must be added manually in Blender 4.x / 5.x
# Go to: Compositing workspace > Add > Filter > Glare > set type to Bloom
# The emission materials already produce strong glow in rendered view

# Render resolution
scene.render.resolution_x = 1920
scene.render.resolution_y = 1080

print("=" * 50)
print("✅ Iron Man Hologram Bust — Script Complete!")
print("   Switch to Camera view (Numpad 0)")
print("   Press Z → Rendered to see the glow")
print("   Hit F12 to render")
print("=" * 50)
