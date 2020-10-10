class AlongateAnimation{
    init(){
        let torsoTween = new TWEEN.Tween({theta:0})
            .to({theta:[degreeToRad(40),0,degreeToRad(-40),0]},2000)
            .onUpdate(function(){
                let torso = ( (robot.getObjectByName("torso")) )
                let rot_pt = new THREE.Vector3
                (
                    torso.__position.x,
                    ( torso.__position.y -  (torso.geometry.parameters.height / 2.25)),
                    -2
                );                

                let angle_step = this._object.theta - torso.rotation.z
                torso.rotateAroundPoint( rot_pt, angle_step );
                stats.update();
                renderer.render(scene, camera);    
            })

        let legsTween = new TWEEN.Tween({theta:0})
            .to({theta:[degreeToRad(-40),0,degreeToRad(40),0]},2000)
            .onUpdate(function(){
                let left_upper_leg = ( (robot.getObjectByName("left_upper_leg")) )
                let right_upper_leg = ( (robot.getObjectByName("right_upper_leg")) )
                
                let rot_pt_right = new THREE.Vector3
                    (
                        ( right_upper_leg.geometry.parameters.width + right_upper_leg.__position.x) / 2,
                        ( right_upper_leg.geometry.parameters.height + right_upper_leg.__position.y) / 2.25,
                        -2
                    );
                let rot_pt_left = new THREE.Vector3
                    (
                        (left_upper_leg.__position.x - (( left_upper_leg.geometry.parameters.width + left_upper_leg.__position.x) / 2)),
                        ( left_upper_leg.geometry.parameters.height + left_upper_leg.__position.y) / 2.25,
                        -2
                    );

                let angle_step = this._object.theta - right_upper_leg.rotation.z
                right_upper_leg.rotateAroundPoint( rot_pt_right, angle_step );
                left_upper_leg.rotateAroundPoint( rot_pt_left, angle_step );
                
                stats.update();
                renderer.render(scene, camera);    

            })

        let upperArmTween = new TWEEN.Tween({theta:0})
            .to({theta:degreeToRad(180)},1000)
            .onUpdate(function(){
                let right_upper_arm = ( (robot.getObjectByName("right_upper_arm")) )
                let left_upper_arm = ( (robot.getObjectByName("left_upper_arm")) )
                let rot_pt_right = new THREE.Vector3
                    (
                        ( right_upper_arm.geometry.parameters.width + right_upper_arm.__position.x) / 2,
                        ( right_upper_arm.geometry.parameters.height + right_upper_arm.__position.y) / 2.25,
                        -2
                    );
                let rot_pt_left = new THREE.Vector3
                    (
                        (left_upper_arm.__position.x - (( left_upper_arm.geometry.parameters.width + left_upper_arm.__position.x) / 2)),
                        ( left_upper_arm.geometry.parameters.height + left_upper_arm.__position.y) / 2.25,
                        -2
                    );
                
                let angle_step = this._object.theta - right_upper_arm.rotation.z
                right_upper_arm.rotateAroundPoint( rot_pt_right, angle_step );
                left_upper_arm.rotateAroundPoint( rot_pt_left, angle_step*-1 );
    
                stats.update();
                renderer.render(scene, camera);    
            })

        let upperArmBackTween = new TWEEN.Tween({theta:degreeToRad(180)})
            .to({theta:0},1000)
            .onUpdate(function(){
                let right_upper_arm = ( (robot.getObjectByName("right_upper_arm")) )
                let left_upper_arm = ( (robot.getObjectByName("left_upper_arm")) )
                let rot_pt_right = new THREE.Vector3
                    (
                        ( right_upper_arm.geometry.parameters.width + right_upper_arm.__position.x) / 2,
                        ( right_upper_arm.geometry.parameters.height + right_upper_arm.__position.y) / 2.25,
                        -2
                    );
                let rot_pt_left = new THREE.Vector3
                    (
                        (left_upper_arm.__position.x - (( left_upper_arm.geometry.parameters.width + left_upper_arm.__position.x) / 2)),
                        ( left_upper_arm.geometry.parameters.height + left_upper_arm.__position.y) / 2.25,
                        -2
                    );
                
                let angle_step = this._object.theta - right_upper_arm.rotation.z
                right_upper_arm.rotateAroundPoint( rot_pt_right, angle_step );
                left_upper_arm.rotateAroundPoint( rot_pt_left, angle_step*-1 );
    
                stats.update();
                renderer.render(scene, camera);    
            })

    

        upperArmTween.start()
        upperArmTween.chain(torsoTween,legsTween)       
        torsoTween.chain(upperArmBackTween)
    }
    animate(time){
        window.requestAnimationFrame(this.animate.bind(this));
        TWEEN.update(time);
    }
    run(){
        this.init();
        this.animate(0);
    }
    
}