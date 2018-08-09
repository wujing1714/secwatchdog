package sec.secwatchdog.mapper;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import sec.secwatchdog.model.Feedback;
import sec.secwatchdog.model.Feederback;
import sec.secwatchdog.model.Lastexhibitrealtime;

@Mapper
public interface FeedbackDao {

    @Select("select firstmedtime,medtotal,exhibitcycle from feedback where neckletid=#{neckletid}")
    public Feedback getFeedback(String neckletid);
    @Insert("insert into feedback(neckletid,feedcycle, exhibitcycle,updatetime, medtotal, firstmedtime,endmedtime) values "
			+ "(#{neckletid},#{feedcycle}, #{exhibitcycle},#{updatetime}, #{medtotal}, #{firstmedtime},#{endmedtime})")
	public void addFeedback(Feedback feedback);
    
    
 
}
