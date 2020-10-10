class JumpJackAnimation{
    init(){
        let torsoTween = new TWEEN.Tween({height:0})
            .to({height:[-1,3,0,2,0]},1000)
            .onUpdate(function(){
                let torso = ( (robot.getObjectByName("torso")) )
                torso.position.y=this._object.height
                stats.update();
                renderer.render(scene, camera);    
            })

        let legsTween = new TWEEN.Tween({theta:0})
            .to({theta:[0,degreeToRad(20),0]},1000)
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
                left_upper_leg.rotateAroundPoint( rot_pt_left, angle_step*-1 );
                
                stats.update();
                renderer.render(scene, camera);    

            })

        let upperArmTween = new TWEEN.Tween({theta:0})
            .to({theta:[0,degreeToRad(120),0]},1000)
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
                        ( right_upper_arm.geometry.parameters.height + right_upper_arm.__position.y) / 2.25,
                        -2
                    );
                
                let angle_step = this._object.theta - right_upper_arm.rotation.z
                right_upper_arm.rotateAroundPoint( rot_pt_right, angle_step );
                left_upper_arm.rotateAroundPoint( rot_pt_left, angle_step*-1 );
    
                stats.update();
                renderer.render(scene, camera);    
            })
    
        let lowerArmTween = new TWEEN.Tween({theta:degreeToRad(0)})
            .to({theta:[0,degreeToRad(110), 0]},1000)
            .onUpdate(function() {
                let right_lower_arm = ( (robot.getObjectByName("right_upper_arm")).getObjectByName("lower_arm") );
                let left_lower_arm = ( (robot.getObjectByName("left_upper_arm")).getObjectByName("lower_arm") );
                let rot_pt = new THREE.Vector3
                (
                    ( 0) / 2,
                    ( right_lower_arm.__position.y  ) / 1.6,
                    0
                );

                let angle_step = this._object.theta - right_lower_arm.rotation.z
                right_lower_arm.rotateAroundPoint( rot_pt, angle_step );
                left_lower_arm.rotateAroundPoint( rot_pt, angle_step*-1 );
                stats.update();
                renderer.render(scene, camera);
            })
        
        let upperArmBackTween = new TWEEN.Tween({theta:degreeToRad(95)})
            .to({theta:0},500)
            .onUpdate(function(){
                let right_upper_arm = ( (robot.getObjectByName("right_upper_arm")) )
                let rot_pt = new THREE.Vector3
                    (
                        ( right_upper_arm.geometry.parameters.width + right_upper_arm.__position.x) / 2,
                        ( right_upper_arm.geometry.parameters.height + right_upper_arm.__position.y) / 2.25,
                        -2
                    );
    
                right_upper_arm.rotateAroundPoint( rot_pt, this._object.theta - right_upper_arm.rotation.z );
    
                stats.update();
                renderer.render(scene, camera);    
            })
            
    
        // upperArmTween.chain(lowerArmTween)
        // lowerArmTween.chain(upperArmBackTween)
        // lowerArmTween.repeat(2)
        // lowerArmTweenBack.chain(lowerArmTween)
        torsoTween.start()
        upperArmTween.start()       
        lowerArmTween.start()       
        legsTween.start()
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