package sec.secwatchdog.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import sec.secwatchdog.model.Districts;

 
@Mapper
public interface DistrictsDao {
	@Select("select * from districts where districtname=#{provinceName} or shortname=#{provinceName}")
    public Districts getDistrictsByDistrictName(String provinceName);
	@Select("select * from districts where districtname=#{param1} or shortname=#{param1} and districtcode like concat(#{param2},'%')")
	public Districts getCityDistrictsByDistrictName(String districtName,String higherLevelDistrictCode);
	@Select("select * from districts where districtcode like concat(#{districtCode},'%')")
	public List<Districts> getDistrictsByDistrictcode(String districtCode);
	@Select("select * from districts where districtcode REGEXP concat(#{provinceCode0to2}, '.{4}000000') and districtcode !=concat(#{provinceCode0to2}, '0000000000')and epidemic = 1")
	public List<Districts> getCitiesAndCountiesByDistrictcode(String provinceCode0to2);
	@Select("select * from districts where districtcode REGEXP concat(#{cityCode0to4}, '.{5}000') and districtcode !=concat(#{cityCode0to4}, '00000000')and epidemic = 1")
	public List<Districts> getCountiesAndTownsByDistrictcode(String cityCode0to4);
	@Select("select * from districts where districtcode REGEXP concat(#{armyCode0to2}, '.{4}00')  and districtcode !=concat(#{armyCode0to2}, '000000') and epidemic = 1")
	public List<Districts> getDivisionsAndRegimentalByDistrictcode(String armyCode0to2);
	@Select("select * from districts where districtcode REGEXP concat(#{divisionCode0to4}, '.{4}')  and districtcode !=concat(#{divisionCode0to4}, '0000') and epidemic = 1")
	public List<Districts> getRegimentalAndCompanyByDistrictcode(String divisionCode0to4);
	@Select("select shortname from districts where districtname =#{districtName} or shortname =#{districtName}")
	public String getEchartsareanametempByDistrictName(String districtName);
	@Select("select districtname from districts where districtname =#{districtName} or shortname =#{districtName}")
	public String getGovareanametempByDistrictName(String districtName);
}